import { Injectable } from '@angular/core';
import { Message } from '../info-form/message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {

  url : string = "https://localhost:5001/api/message";
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(private http: HttpClient) { }

  /** POST: add a new message to the database */
  addMessage(msg: Message): Observable<Message> {
    return this.http.post<Message>(this.url, msg)
      .pipe(
        catchError(this.handleError)
      );
  }
}
