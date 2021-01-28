import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { validate } from './validation';

@Component({
    selector: 'app-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.css']
})

export class InfoFormComponent implements OnInit {
    
    isValid: boolean;
    infoForm = this.formBuilder.group({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        ciudad: ''
    }); 

    constructor(private formBuilder: FormBuilder ) {
        this.isValid = false;
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        // Process checkout data here
        console.log('Your order has been submitted', this.infoForm.value);
        console.log()
        console.log('Is valid?', validate(
            this.infoForm.value.nombre,
            this.infoForm.value.email,
            this.infoForm.value.telefono,
            this.infoForm.value.fecha,
            this.infoForm.value.ciudad
        ));
        this.infoForm.reset();
    }
}
