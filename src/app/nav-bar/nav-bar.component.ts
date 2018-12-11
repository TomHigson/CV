import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Job } from '../cv.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input () jobs:Job[] = [];

  jobsWithStartDate:Job[] = [];
  scaleStartDate:Date = new Date();
  scaleEndDate:Date = new Date(new Date().getFullYear() + 1, 0, 1); //start of next year
  scaleLabels:number[] = [];
  totalPeriod:number = 0; //scope of date scale, in ms
  YEAR_INCREMENT = 2;

  ngOnChanges(changes:SimpleChanges) {

    let jobs = changes.jobs.currentValue;
    this.jobsWithStartDate = jobs.filter(job => job.start);

    //record earliest date
    for (let job of jobs) {
      if (job.start && job.start < this.scaleStartDate) {
        this.scaleStartDate = job.start;
      }
    }

    this.totalPeriod = this.scaleEndDate.getTime() - this.scaleStartDate.getTime();

    //reset and then populate labels list
    this.scaleLabels = [];

    //ensure there was at least 1 start date
    if(this.scaleStartDate < this.scaleEndDate) {

      for(let year:number = this.scaleEndDate.getFullYear();
          year >= this.scaleStartDate.getFullYear();
          year -= this.YEAR_INCREMENT) {

        this.scaleLabels.push(year);
      }
    }
  }

  /** provides the percent the job took up of the period since
   *  the first job started
   * @param Job job The Job to query
   * @returns number from 0 to 100, 0 if the start or end date are missing or in the wrong order*/
  durationOf (job:Job):number {
    if(!job.start || !job.end) return 0;
    if(job.start > job.end) return 0;

    let period:number = job.end.getTime() - job.start.getTime();
    return (period / this.totalPeriod) * 100;
  }

  gapBefore (job:Job) {

  }

  constructor() {}
  ngOnInit() {



  }

}
