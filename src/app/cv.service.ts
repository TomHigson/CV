import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, map} from 'rxjs/operators';

export interface Cv {
  name:string;  //the name of the person the CV describes
  email:string; //email to contact CV owner
  description:string; //name of the markdown file
  banner?:string;  //path to image to repeat in banner
  socialNetworkLinks?:SocialNetworkLink[];
  initialNumberOfShownJobs?:number; //how many jobs to show before 'show more' button
  portrait?:string;  //path to image of the CV owner's face to draw in banner
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
export interface SocialNetworkLink {
  name:string;
  icon:string;
  link:string;
}
interface Config {
  cvUrl:string,
  pdfUrl:string,
  photoUrl:string,
  logoUrl:string,
  textUrl:string,
  iconUrl:string
}
@Injectable({
  providedIn: 'root'
})

export class CvService {

  private config:Config = {
    cvUrl:'src/backend/cvs/tomcv.json',
    pdfUrl: `src/backend/cvs/tomcv.pdf`,
    photoUrl:`src/backend/photos/`,
    logoUrl: `src/backend/logos/`,
    textUrl: `src/backend/text/`,
    iconUrl: `src/backend/icons/`
  }

  constructor (private http:HttpClient) {}

  getPdfUrl():string {
    return this.config.pdfUrl;
  }
  getCv():Observable<Cv> {
    return this.http.get<Cv>(this.config.cvUrl)
      .pipe(
        map (cv => {
          
          //combine file names from cv json with urls from config
          if(cv.banner) cv.banner = this.config.photoUrl + cv.banner;
          if(cv.portrait) cv.portrait = this.config.photoUrl + cv.portrait;
          cv.description = this.config.textUrl + cv.description;

          if(cv.socialNetworkLinks) {
            for (let socialNetworkLink of cv.socialNetworkLinks) {
              socialNetworkLink.icon = this.config.iconUrl + socialNetworkLink.icon;
            }
          }
          for(let job of cv.jobs) {
            job.logo = this.config.logoUrl + job.logo;
            if(job.description) job.description = this.config.textUrl + job.description;

            if(job.roles) {
              for(let role of job.roles) {
                if(role.description) role.description = this.config.textUrl + role.description;
                if(role.image) role.image = this.config.photoUrl + role.image;
              }
            }

            //convert dates from strings into JS Dates
            if(job.start) {
              job.start = new Date(job.start);
            }
            if(job.end) {
              job.end = new Date(job.end);
            }
          }

          return cv;
        }),
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