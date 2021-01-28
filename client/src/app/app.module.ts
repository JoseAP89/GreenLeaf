import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InfoFormComponent } from './info-form/info-form.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    InfoFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
