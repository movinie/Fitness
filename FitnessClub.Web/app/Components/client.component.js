"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var client_service_1 = require("../Service/client.service");
var pager_service_1 = require("../Service/pager.service");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var manageclient_component_1 = require("./manageclient.component");
var material_1 = require("@angular/material");
var ClientComponent = (function () {
    function ClientComponent(_clientService, _pagerService, dialog) {
        this._clientService = _clientService;
        this._pagerService = _pagerService;
        this.dialog = dialog;
        this.searchTitle = "Поиск: ";
        this.pager = {};
    }
    ClientComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(manageclient_component_1.ManageClient);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.client = this.client;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadClients();
                switch (_this.dbops) {
                    case enum_1.DBOperation.create:
                        _this.msg = "Новый клиент успешно добавлен.";
                        break;
                    case enum_1.DBOperation.update:
                        _this.msg = "Данные клиента успешно обновлены.";
                        break;
                    case enum_1.DBOperation.delete:
                        _this.msg = "Клиент успешно удален.";
                        break;
                }
            }
            else if (result == "error")
                _this.msg = "Ошибка!";
            else
                _this.msg = result;
        });
    };
    ClientComponent.prototype.ngOnInit = function () {
        this.LoadClients();
    };
    ClientComponent.prototype.LoadClients = function () {
        var _this = this;
        this._clientService.get(global_1.Global.BASE_CLIENT_ENDPOINT)
            .subscribe(function (clients) {
            _this.allclients = clients;
            _this.setPage(1);
        });
    };
    ClientComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._pagerService.getPager(this.allclients.length, page);
        this.clients = this.allclients.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    ClientComponent.prototype.addClient = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Добавить нового клиента";
        this.modalBtnTitle = "Добавить";
        this.openDialog();
    };
    ClientComponent.prototype.editClient = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Редактировать данные клиента";
        this.modalBtnTitle = "Редактировать";
        this.client = this.allclients.filter(function (x) { return x.ClientId == id; })[0];
        this.openDialog();
    };
    ClientComponent.prototype.deleteClient = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Подтвердить удаление?";
        this.modalBtnTitle = "Удалить";
        this.client = this.allclients.filter(function (x) { return x.ClientId == id; })[0];
        this.openDialog();
    };
    ClientComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    return ClientComponent;
}());
ClientComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/client.component.html'
    }),
    __metadata("design:paramtypes", [client_service_1.ClientService, pager_service_1.PagerService, material_1.MdDialog])
], ClientComponent);
exports.ClientComponent = ClientComponent;
//# sourceMappingURL=client.component.js.map