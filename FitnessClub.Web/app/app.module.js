"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var client_component_1 = require("./components/client.component");
var client_service_1 = require("./Service/client.service");
var pager_service_1 = require("./Service/pager.service");
var client_pipe_1 = require("./filter/client.pipe");
var errorhandler_1 = require("./Shared/errorhandler");
var manageclient_component_1 = require("./components/manageclient.component");
var search_component_1 = require("./Components/search.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule,
            http_1.HttpModule, app_routing_1.routing,
            forms_1.FormsModule, forms_1.ReactiveFormsModule,
            animations_1.BrowserAnimationsModule,
            material_1.MaterialModule,
            material_1.MdNativeDateModule],
        declarations: [app_component_1.AppComponent, client_component_1.ClientComponent, search_component_1.SearchComponent,
            client_pipe_1.ClientFilterPipe, manageclient_component_1.ManageClient],
        providers: [{ provide: core_1.ErrorHandler, useClass: errorhandler_1.default },
            { provide: common_1.APP_BASE_HREF, useValue: '/' },
            client_service_1.ClientService, pager_service_1.PagerService],
        entryComponents: [manageclient_component_1.ManageClient],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map