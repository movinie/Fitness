import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './components/client.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: ClientComponent }
];

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);