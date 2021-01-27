import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void {
    }

    formatDate(){
        console.log("I am here dude!!!");
    }
}
