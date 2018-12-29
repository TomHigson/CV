import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Job, Role}                           from '../cv.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @Input() job:Job = null;
  @Output () load = new EventEmitter<Job>();

  jobDescriptionLoaded:boolean = false;
  loadedRoles:Role[] = [];

  /**Checks whether the sub-elements of the job are all loaded
   * @returns boolean whether the elements are loaded
   */
  loadComplete ():boolean {
    return (!this.job.description || this.jobDescriptionLoaded)  //check if description loaded
        && (!this.job.roles || (this.loadedRoles.length === this.job.roles.length)); //check all roles loaded
  }

  /**Handles the event of a role completing its load */
  roleLoadComplete (role:Role):void {
    this.loadedRoles.push(role);
    if(this.loadComplete()) this.load.emit(this.job);
  }

  /**Handles the event of the job description completing its load */
  jobDescriptionLoadComplete () {
    this.jobDescriptionLoaded = true;
    if(this.loadComplete()) this.load.emit(this.job);
  }

  constructor() {}
  ngOnInit() {}

  getJobDurationString():string {

    let start:Date = this.job.start;
    let end:Date   = this.job.end ? this.job.end : new Date();
    
    let totalDiffInMonths:number =
       end.getMonth() - start.getMonth()
     + ((end.getFullYear() - start.getFullYear()) * 12);

    if (totalDiffInMonths===0) {
      return "";
    }
    else {
      let yearDiff  = Math.floor(totalDiffInMonths / 12);
      let monthDiff = totalDiffInMonths % 12;
  
      let result:string = `(`;

      if (yearDiff === 1) {
        result += `1 year`;
      }
      else if (yearDiff > 1) {
        result += `${yearDiff} years`;
      }

      if (yearDiff >= 1 && monthDiff >= 1) {
        result += `, `;
      }

      if (monthDiff === 1) {
        result += `1 month`;
      }
      else if (monthDiff > 1) {
        result += `${monthDiff} months`;
      }
      return result += `)`;
    }
  }
}