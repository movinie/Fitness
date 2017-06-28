import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../Service/client.service';
import { PagerService } from '../Service/pager.service';
import { IClient } from '../Model/client';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { ManageClient } from './manageclient.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    templateUrl: 'app/Components/client.component.html'
})

export class ClientComponent implements OnInit {

    allclients: IClient[];
    clients: IClient[];
    client: IClient;
    msg: string;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    searchTitle: string = "Поиск: ";
    pager: any = {};

    constructor(private _clientService: ClientService, private _pagerService: PagerService,private dialog: MdDialog) { }

    openDialog() {
        let dialogRef = this.dialog.open(ManageClient);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.client = this.client;

        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadClients();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Новый клиент успешно добавлен.";
                        break;
                    case DBOperation.update:
                        this.msg = "Данные клиента успешно обновлены.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Клиент успешно удален.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "Ошибка!"
            else
                this.msg = result;
        });
    }
    ngOnInit(): void {
        this.LoadClients();
    }
    LoadClients(): void {
        this._clientService.get(Global.BASE_CLIENT_ENDPOINT)
            .subscribe(clients => {
                this.allclients = clients;
                this.setPage(1);                             
            }
            );
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._pagerService.getPager(this.allclients.length, page);
        this.clients = this.allclients.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    addClient() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Добавить нового клиента";
        this.modalBtnTitle = "Добавить";
        this.openDialog();
    }
    editClient(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Редактировать данные клиента";
        this.modalBtnTitle = "Редактировать";

        this.client = this.allclients.filter(x => x.ClientId == id)[0];
        this.openDialog();
    }
    deleteClient(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Подтвердить удаление?";
        this.modalBtnTitle = "Удалить";
        this.client = this.allclients.filter(x => x.ClientId == id)[0];
        this.openDialog();
    }
    criteriaChange(value: string): void {
        if (value != '[object Event]')
            this.listFilter = value;

    }    
}