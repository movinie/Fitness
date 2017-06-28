import { Component } from "@angular/core"
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';


@Component({
    selector: "client-app",
    templateUrl: 'app/app.component.html'   
})

export class AppComponent {
    loading: boolean = true;

    constructor(private router: Router) {

        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }


    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            setTimeout(() => { this.loading = false; }, 1000)
        }

        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }
}