import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

export interface Cv {
  name:string;  //the name of the person the CV describes
  email:string; //email to contact CV owner
  description:string; //name of the markdown file
  banner?:string;  //path to image to repeat in banner
  initialNumberOfShownJobs?:number; //how many jobs to show before 'show more' button
  portrait?:string;  //path to image of the CV owner's face to draw in banner
  twitter?:string;  //user's twitter link
  linkedIn?:string;  //user's linkedIn link
  gitHub?:string;  //user's gitHub link
  fields:string[];
  jobs:Job[];
}
export interface Job {
  id:string;  //unique identifier. Used to set navigation links. Should be alphanumeric
  companyName?:string;
  level:string;
  logo:string;  //path to company logo. should be square to avoid squashing
  link?:string;  //company website
  start?:Date;  //javascript encoded string e.g. 2017-09-01T00:00:00.000Z
  end?:Date;  //same format as start. If not present, assumes current job
  contact?:string;
  contactEmail?:string;
  roles?:Role[];
  description?:string; //name of the markdown file
  technologies?:Technology[];
}
export interface Role {
  position:string;
  image?:string; //path to image
  imageCaption?:string; //image's caption. Also used for alt text
  description?:string; //name of the markdown file
}
export interface Technology {
  name:string;
  link:string;
}
@Injectable({
  providedIn: 'root'
})

export class CvService {

  //collected here for convinience
  //future enhancement could be to get this from a config service
  private config = {
    cvUrl:'src/backend/cvs/tomcv.json',
    pdfUrl: `src/backend/cvs/tomcv.pdf`,
    photoUrl:`src/backend/photos/`,
    logoUrl: `src/backend/logos/`,
    textUrl: `src/backend/text/`
  }
  getPhotoUrl(name:string) {
    return this.config.photoUrl + name;
  }
  getLogoUrl(name:string) {
    return this.config.logoUrl + name;
  }
  getTextUrl(name:string) {
    return this.config.textUrl + name;
  }
  getPdfUrl() {
    return this.config.pdfUrl;
  }

  constructor(private http: HttpClient) { }

  getCv():Observable<Cv> {
    return this.http.get<Cv>(this.config.cvUrl)
      .pipe(
        retry(3),
        catchError(this.handleCvGetError)
    );
  }

  private handleCvGetError(err: HttpErrorResponse) {
    // in larger scale app could send to remote logging service
    // instead just log it to the console
    // error messages are just placeholders for now
    let userErrorMessage = '';
    if (err.error instanceof ErrorEvent) {

      // client-side or network error
      console.error(`An error occurred: ${err.error.message}`);
      userErrorMessage = `The CV couldn't be loaded. Please check your connection and try again.`

    } else {

      // the backend returned an unsuccessful response code
      // the response body may contain clues as to what went wrong
      console.error(
        `Server returned code: ${err.status}, error message is: ${err.message}`);
      userErrorMessage = `We're experiencing some difficulties at the moment. Please be patient.`

    }
    return throwError(userErrorMessage);
  }

}