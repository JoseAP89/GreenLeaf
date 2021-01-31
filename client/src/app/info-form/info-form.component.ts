import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { validate } from './validation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import {  GetCityService} from '../services/get-city.service' 
import {  Message} from './message' 
import { GeoNameI} from '../services/GeoNameI' 
import { GeolocationI} from '../services/GeolocationI' 
import { FormHandlerService} from '../services/form-handler.service' 


@Component({
    selector: 'app-info-form',
    templateUrl: './info-form.component.html',
    styleUrls: ['./info-form.component.css']
})

@Injectable()
export class InfoFormComponent implements OnInit {

    infoForm: FormGroup;
    docObject: any;
    errors: string[]; 
    modalRef: any;
    isValid: boolean;
    search: string;
    today: Date;
    cities: GeoNameI[];
    cityOptionsBox: boolean;    // cityOptionsBox toggles the box on and off
    message: Message;
   
    constructor(private formBuilder: FormBuilder, private localeService: BsLocaleService,
        private modalService: BsModalService, private cityServiece: GetCityService,
        private formHandlerService: FormHandlerService) {
        this.infoForm = this.formBuilder.group({
            nombre: null,
            email: null,
            telefono: null,
            fecha: null,
            ciudad: null
        }); 
        this.message = this.infoForm.value;
        this.errors = [],
        defineLocale('es', esLocale);
        this.localeService.use("es");
        this.docObject = null;
        this.isValid = false;
        this.today = new Date();
        this.search = "";
        this.cities = [];
        this.cityOptionsBox = false;
    }

    ngOnInit(): void {
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    // it uses cityService to make a http request to the server to get the cities that match the
    // search
    getCities() {
        if (this.search.length >= 3) {
            this.cityOptionsBox = true;
            this.cityServiece.getCities(this.search).subscribe((data: GeolocationI) => {
                this.cities = data.geoNames;
            })
        }
    }

    // city selected from the city choices box which will set the city field in the form, search
    selectCity(city: GeoNameI) {
        this.search = city.toponymName + ", " + city.adminName1 + ", " +city.countryName;
        this.cityOptionsBox = false;
    }

    // it turns off the option city box
    turnBoxOff() {
        this.cityOptionsBox = false;
    }

    onSubmit(): void {
        // Process checkout data here
        this.docObject = document.getElementById("modalError");
        this.message = this.infoForm.value;
        let date = this.message.fecha;
        if (date != null && date!="Invalid Date") {
            this.message.fecha =  date.getDate().toString() + "-" +
                (date.getMonth()+1).toString() + "-" +date.getFullYear().toString();
        }

        // process of validation occurs here
        let { isValid, errors} = validate(this.message.nombre, this.message.email, 
            this.message.telefono,
            this.message.fecha,
            this.message.ciudad
        );
        this.errors = errors;
        this.isValid = isValid;
        if(isValid) {
            this.formHandlerService.addMessage(this.message)
                .subscribe();
            console.log("Message sent");
        } else {
            // it fires the button that shows the modal up
            this.docObject.click();
        }
    }
}
