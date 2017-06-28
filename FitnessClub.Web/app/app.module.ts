import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { ClientComponent } from './components/client.component';
import { ClientService } from './Service/client.service'
import { PagerService } from './Service/pager.service'
import { ClientFilterPipe } from './filter/client.pipe'
import AppErrorHandler from './Shared/errorhandler';
import { ManageClient } from './components/manageclient.component';
import { SearchComponent } from './Components/search.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule,
        HttpModule, routing,
        FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MdNativeDateModule],
    declarations: [AppComponent, ClientComponent, SearchComponent,
        ClientFilterPipe, ManageClient],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: APP_BASE_HREF, useValue: '/' },
        ClientService, PagerService],
    entryComponents: [ManageClient],
    bootstrap: [AppComponent]

})
export class AppModule {
    
}
