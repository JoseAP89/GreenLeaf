import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { validate } from './validation';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.css']
})

export class InfoFormComponent implements OnInit {

    infoForm: FormGroup;
    docObject: any;
    errors: string[]; 
    modalRef: any;
    isValid: boolean;
    today: Date;
   
    constructor(private formBuilder: FormBuilder, private localeService: BsLocaleService,
        private modalService: BsModalService) {
        this.infoForm = this.formBuilder.group({
            nombre: null,
            email: null,
            telefono: null,
            fecha: null,
            ciudad: null
        }); 
        this.errors = [],
        defineLocale('es', esLocale);
        this.localeService.use("es");
        this.docObject = null;
        this.isValid = false;
        this.today = new Date();
    }

    ngOnInit(): void {
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    onSubmit(): void {
        // Process checkout data here
        this.docObject = document.getElementById("modalError");
        let date = this.infoForm.value.fecha;
        console.log("date = ",date);
        console.log("date == Invalid Date ",date=="Invalid Date");
        if (date != null && date!="Invalid Date") {
            this.infoForm.value.fecha =  date.getDate().toString() + "-" +
            (date.getMonth()+1).toString() + "-" +date.getFullYear().toString();
        }

        console.log('Your order has been submitted', this.infoForm.value);
        let { isValid, errors} = validate(this.infoForm.value.nombre, this.infoForm.value.email, 
            this.infoForm.value.telefono,
            this.infoForm.value.fecha,
            this.infoForm.value.ciudad
        );
        this.errors = errors;
        this.isValid = isValid;
        if(isValid) {
            console.log("Message sent");
        } else {
            this.docObject.click();
        }
    }
}
