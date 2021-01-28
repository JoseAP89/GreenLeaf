import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { validate } from './validation';

@Component({
    selector: 'app-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.css']
})

export class InfoFormComponent implements OnInit {

    isValid: boolean;
    infoForm: FormGroup; 

    constructor(private formBuilder: FormBuilder, private localeService: BsLocaleService ) {
        this.isValid = false;
        this.infoForm = this.formBuilder.group({
            nombre: null,
            email: null,
            telefono: null,
            fecha: null,
            ciudad: null
        }); 
        defineLocale('es', esLocale);
        this.localeService.use("es");
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        // Process checkout data here
        let date = this.infoForm.value.fecha;
        console.log("date = ",date);
        console.log("date == Invalid Date ",date=="Invalid Date");
        if (date != null && date!="Invalid Date") {
            this.infoForm.value.fecha =  date.getDate().toString() + "-" +
            (date.getMonth()+1).toString() + "-" +date.getFullYear().toString();
        }

        console.log('Your order has been submitted', this.infoForm.value);
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
