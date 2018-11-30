import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

export interface Cv {
  name:string;  //the name of the person the CV describes
  description:string; //markdown encoded
  portrait:string;  //path to image of the person's face. Should be square
  fields:Skill[];
  skills:Skill[];
  jobs:Job[];
}
export interface Job {
  companyName?:string;
  level:string;
  avatar:string;  //path to company logo. should be square
  link?:string;  //comapny website
  startMonth?:number; //if not present, assume January
  startYear?:number;
  endMonth?:number;   //if not present, assume January
  endYear?:number;    //if not present, assume current
  contact?:string;
  contactEmail?:string;
  roles?:Role[];
  description?:string;  //markdown encoded description
}
export interface Role {
  project?:string;
  role:string;
  image?:string; //path to image
  imageAlt?:string; //image's alt text
  link?:string; //if project is describved on the internet
  description?:string;  //markdown encoded description
}
export interface Skill {
  name:string;
  level?:SkillLevel;
  link?:string;  //for technology/tool homepage
}
export enum SkillLevel {
  expert = "Expert",
  professional = "Professional",
  experienced = "Experienced"
}
@Injectable({
  providedIn: 'root'
})

export class CvService {

  //collected here for convinience
  //future enhancement could be to get this from a config service
  private config = {
    cvUrl:'src/backend/tomcv.json',
    photoUrl:`src/backend/photos/`,
    logoUrl:`src/backend/logos/`
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

  getPhotoUrl(name:string) {
    return this.config.photoUrl + name;
  }

  getLogoUrl(name:string) {
    return this.config.logoUrl + name;
  }

}