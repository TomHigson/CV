import {Component,
        OnInit,
        Input,
        SimpleChanges,
        HostListener,
        Output,
        EventEmitter}  from '@angular/core';
import {Job}           from '../cv.service';
import {fade}          from '../animations/fade';

interface Link {
  jobId:    string;  // the id of the job being linked to
  position: string;  // the job position - used as the link text
  company?: string;  // the job company - also used in the link text
  active:   boolean; // if the associated job is being viewed
  start:    Date;    // the start date of the associated Job
  end:      Date;    // the end date of the associated Job
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [fade]
})

export class NavBarComponent implements OnInit {
  @Input () jobs:Job[] = [];
  @Input () visible:boolean = true;
  @Output () linkNavigated = new EventEmitter<string>();

  links:Link[] = [];
  scaleTop:Date = new Date(new Date().getFullYear() + 1, 0, 1); //start of next year
  scaleBottom:Date = new Date(new Date().getFullYear(), 0, 1); //default to start of this year, to be changed later
  scaleLabels:Date[] = [];
  LABEL_YEAR_INCREMENT:number = 2;
  ngOnChanges(changes:SimpleChanges) {

    if (changes.jobs) {

      //create new set of links
      this.links = [];
      for (let job of this.jobs) {
        let newLink:Link = {
          jobId:    job.id,
          company:  job.companyName,
          position: job.level,
          start:    job.start,
          end:      job.end? job.end:new Date(), //if no end date, use current date
          active:   false, //default, to be set later
        }
        this.links.push(newLink);
      }

      //cannot display on timeline without a start date so remove such jobs
      this.links = this.links.filter(link => link.start)

      //check which job is on screen
      this.updateActiveLink();

      //recalculate the scale
      //record earliest date as bottom of the scale
      for (let link of this.links) {
        if (link.start && link.start < this.scaleBottom) {
          this.scaleBottom = link.start;
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

  /**Provides the percent a given date is along the scale of 
   * this.scaleStartDate to this.scaleEndDate
   * 
   * Note: the scale is most recent at top
   * 
   * @param date The date to get a percent position from
   * @returns Percent position along the scale */
  scale(date:Date):number {
    const totalPeriod:number = this.scaleTop.getTime() - this.scaleBottom.getTime(); //scope of date scale, in ms
    
    return ((this.scaleTop.getTime() - date.getTime()) / totalPeriod) * 100;
  }
  scaleBetween(laterDate:Date, earlierDate:Date):number {
    const period:number = laterDate.getTime() - earlierDate.getTime();
    const totalPeriod:number = this.scaleTop.getTime() - this.scaleBottom.getTime(); //scope of date scale, in ms
        
    return (period / totalPeriod) * 100;
  }

  @HostListener('window:resize', ['$event']) reactToResize():void {this.updateActiveLink()};
  @HostListener('window:scroll', ['$event']) updateActiveLink():void {

    for(let link of this.links) {

      let anchor:HTMLElement = document.getElementById(link.jobId);
      if(!anchor) continue; //linked element not found

      let menuOffset   :number = 64;
      let topOfViewport:number = (window.innerHeight - menuOffset) /4; //ignoring header, 1/4 of screen

      let fullyOnScreen:boolean =
        window.pageYOffset + menuOffset <= anchor.offsetTop
     && window.pageYOffset + window.innerHeight >= anchor.offsetTop + anchor.offsetHeight;

      let scrolledPastTop:boolean =
        window.pageYOffset + topOfViewport > anchor.offsetTop;

      let scrolledPastBottom:boolean =
        window.pageYOffset + topOfViewport > anchor.offsetTop + anchor.offsetHeight;

      if (fullyOnScreen || (scrolledPastTop && !scrolledPastBottom)) link.active=true;
      else link.active = false;
      
    }

  }

  /**Performs no behaviour, triggers an event in the parent component
   * as that is likely to be better placed to handle navigation
   * @param elem The link to navigate */
  navigateLink(link:Link):void {

    if(!this.visible) return; //nav bar is hidden, do nothing
    this.linkNavigated.emit(link.jobId);
    
  }

  constructor() {}
  ngOnInit() {}

}