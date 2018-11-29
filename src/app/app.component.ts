import {Component, OnInit} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {Cv} from './cv';
import {Skill} from './skill/skill';
import {CvService} from './cv.service';
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
  filteredSkills:Skill[] = [];
  currentTheme=`dark-theme`;
  
  constructor(private cvService:CvService,
              private titleService:Title,
              private overlayContainer:OverlayContainer,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {

    this.overlayContainer.getContainerElement().classList.add(this.currentTheme);

    //load cv using cv service
    this.cvService.getCv().subscribe(
      cv => {
        this.cv = cv;
        this.filteredSkills = cv.skills;
        this.titleService.setTitle(cv.name + `'s CV`);

      }
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

  toggleTheme():void {
    this.currentTheme = this.currentTheme===`dark-theme`?`light-theme`:`dark-theme`;

    //also change theme of overlays
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.currentTheme);
  }

}