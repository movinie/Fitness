"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var client_component_1 = require("./components/client.component");
var appRoutes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: client_component_1.ClientComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map