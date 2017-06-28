import { ErrorHandler } from '@angular/core';

export default class AppErrorHandler extends ErrorHandler {
    constructor() {
        super(true);
    }

    handleError(error: any) {
        debugger;
        if (error.status == '401')
            alert("You are not logged in, please log in and come back!")
        else
            alert(error);
        super.handleError(error);
    }
}