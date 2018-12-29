import {Component,
        OnInit,
        HostListener}     from '@angular/core';
import {Title}            from '@angular/platform-browser';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatIconRegistry}  from '@angular/material/icon';
import {DomSanitizer}     from '@angular/platform-browser';

import {CvService,
        Cv,
        Technology,
        Job}              from './cv.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  @HostListener('window:scroll', ['$event']) updateNavBarVisibility() {
    
    //place navElement fixed position on screen
    let appearPoint:HTMLElement = document.getElementById("app-nav-bar-appear-point");
    if(appearPoint) {
      if(window.pageYOffset > appearPoint.offsetTop) {
        this.showingNavBar = true;
      }
      else this.showingNavBar = false;
    }
  }
      
  cv:Cv = null; //currently shown cv
  showingNavBar:boolean = false;

  initialJobsToShow:number = 100; //default to be changed later
  shownJobs:Job[] = []; //filtered list of jobs for current view
  truncatingJobs:boolean = false;  //whether the shown jobs include all jobs
  loadedJobs:Job[] = [];  //the set of jobs that have completed loading
  deferredLink:string = null; //if a link navigation is attempted but the element
                              //isn't loaded, the link is stored here for future use

  //combination of all the technologies mentioned within
  //various parts of the CV with no duplicates
  combinedTechList:Technology[] = [];

  currentTheme:string = 'dark-theme';

  errorMessage='';  //captures human readable load errors
  
  constructor(private cvService:CvService,
              private titleService:Title,
              private overlayContainer:OverlayContainer,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {}

  ngOnInit():void {

    //set theme for overlays
    this.overlayContainer.getContainerElement().classList.add(this.currentTheme);

    //load cv
    this.cvService.getCv().subscribe(
      (data:Cv) => {
        this.cv = data;
        
        this.titleService.setTitle(data.name + `'s CV`);

        for(let job of this.cv.jobs) {

          //convert dates from strings into JS Dates
          if(job.start) {
            job.start = new Date(job.start);
          }
          if(job.end) {
            job.end = new Date(job.end);
          }

          if(job.technologies) {

            //consolodate technologies into master list
            let newTechsToAdd:Technology[] =
              job.technologies.filter(newTech => !(this.combinedTechList.some(
                existingTech => existingTech.name === newTech.name)));

            this.combinedTechList = [...this.combinedTechList, ...newTechsToAdd];
          }
        }

        //filter jobs for initial view
        if(this.cv.initialNumberOfShownJobs) {
          this.initialJobsToShow = this.cv.initialNumberOfShownJobs;
        }

        if(this.cv.jobs.length <= this.initialJobsToShow) {
          this.truncatingJobs = false;
          this.shownJobs = this.cv.jobs;
        }
        else {
          this.truncatingJobs = true;
          this.shownJobs = this.cv.jobs.slice(0,this.initialJobsToShow);
        }
        
      },
      error => this.errorMessage = error
    );
  
    //load icons
    this.addIcon(`lightbulb-on`)
    this.addIcon(`lightbulb-off`)
    this.addIcon(`twitter`)
    this.addIcon(`linked-in`)
    this.addIcon(`github`)
  }
  
  /**Helper method to load an icon into the material icon registry
   * It assumes the icon is located in assets/icons and is an SVG.
   * It uses the filename as the registered name
   * @param name The name of the new icon without any extension or leading path */
  private addIcon (filename:string):void {
    this.matIconRegistry.addSvgIcon(
      filename,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/` + filename + `.svg`)
    );
  }

  /**Handles the event of a role completing its load */
  jobLoadComplete (job:Job):void {
    this.loadedJobs.push(job);

    //check if we were waiting of this being loaded
    if(job.id === this.deferredLink) {
      this.navigateLink(this.deferredLink);
    }
  }

  /**Switches to the stated theme
   * @param themeName The name of the theme to switch to */
  setTheme(themeName:string):void {
    
    //disable transitions so the theme change isn't animated
    document.body.classList.add(`no-transition`);

    //change theme
    this.currentTheme = themeName;

    //re-enable transitions
    //delay is a hack to ensure angular has enough time to do binding
    setTimeout(function () {document.body.classList.remove('no-transition')}, 100);
    
    //also change theme of overlays
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(themeName);
  }

  /**Stop job filtering */
  showAllJobs():void {
    this.shownJobs=this.cv.jobs;
    this.truncatingJobs=false;
  }

  navigateLink(id:string):void {

    let anchorElement:HTMLElement = document.getElementById(id);
    if(!anchorElement) {
      
      //anchor element not found, check if it's a filtered job
      if (this.truncatingJobs && this.cv.jobs.find(job => job.id === id)) {

        //remove the filter
        this.showAllJobs();

      }

      //save the link to be navigated when the anchor is loaded
      this.deferredLink = id;
    }
    
    else window.scrollTo (0, anchorElement.offsetTop -80);
  }
}