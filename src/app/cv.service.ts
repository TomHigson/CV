import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

import {Cv} from './cv';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private cvUrl = 'src/api/tomcv.json';

  constructor(private http: HttpClient) { }

  getCv(): Observable<Cv> {
    return this.http.get<Cv>(this.cvUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in larger scale app could send to remote logging service
    // instead of just log it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client-side or network error
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // the backend returned an unsuccessful response code
      // the response body may contain clues as to what went wrong
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}