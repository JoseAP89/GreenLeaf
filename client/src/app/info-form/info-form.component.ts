import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.css']
})

export class InfoFormComponent implements OnInit {
    infoForm = this.formBuilder.group({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        ciudad: ''
    }); 

    constructor(private formBuilder: FormBuilder ) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        // Process checkout data here
        console.log('Your order has been submitted', this.infoForm.value);
        this.infoForm.reset();
    }
}
