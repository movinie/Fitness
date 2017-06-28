import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../Service/client.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { IClient, ISports } from '../Model/client';
import { DBOperation } from '../Shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../Shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';



@Component({
    templateUrl: 'app/Components/manageclient.component.html',
})
export class ManageClient implements OnInit {

    clientSports: ISports[] = Global.AllSports;

    msg: string;
    indLoading: boolean = false;
    clientFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    client: IClient;

    countries = [
        { value: 'Россия', viewValue: 'Россия' },
        { value: 'Германия', viewValue: 'Германия' },
        { value: 'Франция', viewValue: 'Франция' },
        { value: 'Великобритания', viewValue: 'Великобритания' }       
    ];   

    gender = [
        'Мужской',
        'Женский'
    ];
   
    stateCtrl: FormControl;

    buildSports(): FormArray {
        const arr = this.clientSports.map(s => {
            return this.fb.group({
                Selected: false,
                SportId: s.SportId,
                Name: s.Name
            });
        });
        return this.fb.array(arr);       
    }

    get ClientSports(): FormArray {
        return this.clientFrm.get('ClientSports') as FormArray;
    }

    constructor(private fb: FormBuilder,
        private _clientService: ClientService,
        public dialogRef: MdDialogRef<ManageClient>) { }     

    ngOnInit(): void {
        this.clientFrm = this.fb.group({
            ClientId: 0,
            FirstName: ['', [Validators.required, Validators.maxLength(50)]],
            LastName: ['', [Validators.required, Validators.maxLength(50)]],
            Email: ['', [Validators.required, Validators.email]],
            Gender: ['', Validators.required],
            Date: ['', Validators.required],
            City: ['', Validators.required],
            Zip: ['', Validators.required],
            Country: ['', Validators.required],
            ClientSports: this.buildSports()
        });


        if (this.dbops == DBOperation.create) {
            this.reset();
        }
        else {
            let existingSports = this.clientSports.map(x => {
                return {
                    Selected: (this.client.ClientSports.find(y => y.SportId === x.SportId)) ? true : false,
                    SportId: x.SportId,
                    Name: x.Name
                }
            });
            this.client.ClientSports = existingSports;
            this.clientFrm.setValue(this.client);
        }

        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }      
 
    onValueChanged(data?: any) {
        if (!this.clientFrm) { return; }
        const form = this.clientFrm;

        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    reset(): void {
        this.clientFrm.setValue({
            ClientId: 0,
            FirstName: '',
            LastName: '',
            Email: '',
            Gender: '',
            Date: '',
            City: '',
            Zip: '',
            Country: '',
            ClientSports: this.clientSports.map(s => {
                return {
                    Selected: false,
                    SportId: s.SportId,
                    Name: s.Name
                }
            })
        });
    }

    formErrors = {
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'Gender': '',
        'Date': '',
        'City': '',
        'Zip': '',
        'Country': ''
    };

    validationMessages = {
        'FirstName': {
            'maxlength': 'Максимум 50 символов.',
            'required': 'Укажите Имя.'
        },
        'LastName': {
            'maxlength': 'Максимум 50 символов.',
            'required': 'Укажите Фамилия.'
        },
        'Email': {
            'email': 'Некорректный email.',
            'required': 'Email обязательное поле.'
        },
        'Gender': {
            'required': 'Выберите Пол.'
        }
        ,
        'Date': {
            'required': 'Укажите Дату регистрации.'
        }
        ,
        'City': {
            'required': 'Укажите Город.'
        }
        ,      
        'Zip': {
            'required': 'Укажите Почтовый индекс.'
        }        ,
        'Country': {
            'required': 'Укажите Страну.'
        }
    };

    onSubmit(formData: any) {
        const frmClientSports: any[] = <any[]>formData.value.ClientSports;
        const mine: any[] = frmClientSports.filter(x => x.Selected);
        let selectedSports: ISports[] = <ISports[]>mine.map(x => this.clientSports.find(y => y.SportId === x.SportId));
        formData.value.ClientSports = mine; 
        switch (this.dbops) {
            case DBOperation.create:

                this._clientService.post(Global.BASE_CLIENT_ENDPOINT, formData.value)
                    .subscribe(
                    data => {
                        if (data == 1) 
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.update:
                this._clientService.put(Global.BASE_CLIENT_ENDPOINT,
                    formData._value.ClientId, formData._value).subscribe(
                    data => {
                        if (data == 1) 
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.delete:
                this._clientService.delete(Global.BASE_CLIENT_ENDPOINT, formData._value.ClientId).subscribe(
                    data => {
                        if (data == 1) 
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;

        }
    }

    SetControlsState(isEnable: boolean) {
        isEnable ? this.clientFrm.enable() : this.clientFrm.disable();
    }
}