import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-list',
    templateUrl: 'app/Components/search.component.html'
})

export class SearchComponent {

    listFilter: string;
    @Input() title: string;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    getEachChar(value: any) {
        this.change.emit(value);
    }

    clearFilter() {
        this.listFilter = null;
        this.change.emit(null);
    }

    getPasteData(value: any) {
        let pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    }
}