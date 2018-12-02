import { Component, OnInit, Input } from '@angular/core';
import { CvService, Job } from '../cv.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @Input() job:Job = null;

  constructor(private cvService:CvService) {}
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