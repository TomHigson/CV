import {Component, OnInit} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {CvService, Cv, Technology} from './cv.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cv:Cv = null;
  currentTheme:string = 'dark-theme';
  combinedTechList:Technology[] = [];
  errorMessage='';
  
  constructor(private cvService:CvService,
              private titleService:Title,
              private overlayContainer:OverlayContainer,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {}

  ngOnInit():void {

    this.overlayContainer.getContainerElement().classList.add(this.currentTheme);

    //load cv using cv service
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
        
      },
      error => this.errorMessage = error
    );
  
    //load icons
    this.addIcon(`lightbulb-on`)
    this.addIcon(`lightbulb-off`)
  }
  
  /**Helper method to load an icon into the material icon registry
   * It assumes the icon is located in assets/icons and is an SVG.
   * It uses the filename as the registered name
   * @param name The of the new icon without any extension or leading path
   */
  private addIcon (filename:string):void {
    this.matIconRegistry.addSvgIcon(
      filename,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/` + filename + `.svg`)
    );
  }

  setTheme(themeName:string):void {
    
    this.currentTheme = themeName;

    //also change theme of overlays
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(themeName);
  }

}