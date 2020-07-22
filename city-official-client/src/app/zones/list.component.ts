import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    zones = null;


    ngOnInit() {
        /*this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);*/
    }

    deleteZone(id: string) {
        const zone = this.zones.find(x => x.id === id);

    }
}