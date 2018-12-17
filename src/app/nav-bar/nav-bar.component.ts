import {Component, OnInit, Input, SimpleChanges, SystemJsNgModuleLoader} from '@angular/core';
import {Job}                                     from '../cv.service';
import {fade}                                    from '../animations/fade';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [fade]
})

export class NavBarComponent implements OnInit {
  @Input () jobs:Job[] = [];
  @Input () visible:boolean = true;
  jobsWithStartDate:Job[] = [];

  scaleTop:Date = new Date(new Date().getFullYear() + 1, 0, 1); //start of next year
  scaleBottom:Date = new Date(new Date().getFullYear(), 0, 1); //default to start of this year, to be changed later
  scaleLabels:Date[] = [];
  LABEL_YEAR_INCREMENT:number = 2;

  /**Provides the percent a given date is along the scale of 
   * this.scaleStartDate to this.scaleEndDate
   * 
   * Note: the scale is most recent at top
   * 
   * @param date The date to get a percent position from
   * @returns Percent position along the scale
   */
  scale(date:Date):number {
    if(!date) date = new Date();
    const totalPeriod:number = this.scaleTop.getTime() - this.scaleBottom.getTime(); //scope of date scale, in ms
    
    return ((this.scaleTop.getTime() - date.getTime()) / totalPeriod) * 100;
  }
  scaleBetween(laterDate:Date, earlierDate:Date):number {
    if(!laterDate) laterDate = new Date();
    const period:number = laterDate.getTime() - earlierDate.getTime();
    const totalPeriod:number = this.scaleTop.getTime() - this.scaleBottom.getTime(); //scope of date scale, in ms
        
    return (period / totalPeriod) * 100;
  }

  ngOnChanges(changes:SimpleChanges) {

    if (changes.jobs) {

      //recalculate the scale
      let jobs = changes.jobs.currentValue;
      this.jobsWithStartDate = jobs.filter(job => job.start);

      //record earliest date as bottom of the scale
      for (let job of jobs) {
        if (job.start && job.start < this.scaleBottom) {
          this.scaleBottom = job.start;
        }
      }

      //round ealiest date to start of the year so the scale looks nicer
      this.scaleBottom = new Date(this.scaleBottom.getFullYear(), 0, 1)

      //reset and then populate labels list
      //this will include the extreme ends of the scale, plus years in a set increment
      this.scaleLabels = [];
      const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30
      for(let label:Date = this.scaleBottom;
          label <= new Date (this.scaleTop.getTime() - (MONTH_IN_MS * 6));  //prevent overlap by not adding a label within a few months of the end
          label = new Date (label.getFullYear() + this.LABEL_YEAR_INCREMENT, label.getMonth(), label.getDate())) {

        this.scaleLabels.unshift(label);
      }
      this.scaleLabels.unshift(this.scaleTop);
    }
  }

  constructor() {}
  ngOnInit() {}

}
