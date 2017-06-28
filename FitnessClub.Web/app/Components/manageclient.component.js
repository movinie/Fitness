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
var forms_1 = require("@angular/forms");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var material_1 = require("@angular/material");
var ManageClient = (function () {
    function ManageClient(fb, _clientService, dialogRef) {
        this.fb = fb;
        this._clientService = _clientService;
        this.dialogRef = dialogRef;
        this.clientSports = global_1.Global.AllSports;
        this.indLoading = false;
        this.countries = [
            { value: 'Россия', viewValue: 'Россия' },
            { value: 'Германия', viewValue: 'Германия' },
            { value: 'Франция', viewValue: 'Франция' },
            { value: 'Великобритания', viewValue: 'Великобритания' }
        ];
        this.gender = [
            'Мужской',
            'Женский'
        ];
        this.formErrors = {
            'FirstName': '',
            'LastName': '',
            'Email': '',
            'Gender': '',
            'Date': '',
            'City': '',
            'Zip': '',
            'Country': ''
        };
        this.validationMessages = {
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
            },
            'Date': {
                'required': 'Укажите Дату регистрации.'
            },
            'City': {
                'required': 'Укажите Город.'
            },
            'Zip': {
                'required': 'Укажите Почтовый индекс.'
            },
            'Country': {
                'required': 'Укажите Страну.'
            }
        };
    }
    ManageClient.prototype.buildSports = function () {
        var _this = this;
        var arr = this.clientSports.map(function (s) {
            return _this.fb.group({
                Selected: false,
                SportId: s.SportId,
                Name: s.Name
            });
        });
        return this.fb.array(arr);
    };
    Object.defineProperty(ManageClient.prototype, "ClientSports", {
        get: function () {
            return this.clientFrm.get('ClientSports');
        },
        enumerable: true,
        configurable: true
    });
    ManageClient.prototype.ngOnInit = function () {
        var _this = this;
        this.clientFrm = this.fb.group({
            ClientId: 0,
            FirstName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            LastName: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            Email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            Gender: ['', forms_1.Validators.required],
            Date: ['', forms_1.Validators.required],
            City: ['', forms_1.Validators.required],
            Zip: ['', forms_1.Validators.required],
            Country: ['', forms_1.Validators.required],
            ClientSports: this.buildSports()
        });
        if (this.dbops == enum_1.DBOperation.create) {
            this.reset();
        }
        else {
            var existingSports = this.clientSports.map(function (x) {
                return {
                    Selected: (_this.client.ClientSports.find(function (y) { return y.SportId === x.SportId; })) ? true : false,
                    SportId: x.SportId,
                    Name: x.Name
                };
            });
            this.client.ClientSports = existingSports;
            this.clientFrm.setValue(this.client);
        }
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageClient.prototype.onValueChanged = function (data) {
        if (!this.clientFrm) {
            return;
        }
        var form = this.clientFrm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ManageClient.prototype.reset = function () {
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
            ClientSports: this.clientSports.map(function (s) {
                return {
                    Selected: false,
                    SportId: s.SportId,
                    Name: s.Name
                };
            })
        });
    };
    ManageClient.prototype.onSubmit = function (formData) {
        var _this = this;
        var frmClientSports = formData.value.ClientSports;
        var mine = frmClientSports.filter(function (x) { return x.Selected; });
        var selectedSports = mine.map(function (x) { return _this.clientSports.find(function (y) { return y.SportId === x.SportId; }); });
        formData.value.ClientSports = mine;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._clientService.post(global_1.Global.BASE_CLIENT_ENDPOINT, formData.value)
                    .subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.update:
                this._clientService.put(global_1.Global.BASE_CLIENT_ENDPOINT, formData._value.ClientId, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.delete:
                this._clientService.delete(global_1.Global.BASE_CLIENT_ENDPOINT, formData._value.ClientId).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
        }
    };
    ManageClient.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.clientFrm.enable() : this.clientFrm.disable();
    };
    return ManageClient;
}());
ManageClient = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/manageclient.component.html',
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        client_service_1.ClientService,
        material_1.MdDialogRef])
], ManageClient);
exports.ManageClient = ManageClient;
//# sourceMappingURL=manageclient.component.js.map