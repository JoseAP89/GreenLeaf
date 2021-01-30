import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { validate } from './validation';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { GetCityServiceService as GetCityService} from '../services/get-city-service.service' 
import { GeoNameI} from '../services/GeoNameI' 


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
    cityOptionsBox: boolean;
   
    constructor(private formBuilder: FormBuilder, private localeService: BsLocaleService,
        private modalService: BsModalService, private cityServiece: GetCityService) {
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
        this.cityOptionsBox = true;
        if (this.search.length >= 3) {
            this.cityServiece.getCities(this.search).subscribe((data) => {
                this.cities = data.geoNames;
            })
        }
    }

    // city selected from the city choices box which will set the city field in the form, search
    // cityOptionsBox toggles the box on and off
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
        let date = this.infoForm.value.fecha;
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
            // it fires the button that shows the modal up
            this.docObject.click();
        }
    }
}
