import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {GeolocationI} from './GeolocationI'


@Injectable({
  providedIn: 'root'
})
export class GetCityServiceService {

  url: string = "https://localhost:5001/api/city/";
  constructor(private http: HttpClient) { }

  public getCities(search: string): Observable<GeolocationI> {
    return this.http.get<any>(this.url + search);
  }
}
