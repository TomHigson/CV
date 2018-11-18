import {Component, OnInit} from '@angular/core';
import {Title}     from '@angular/platform-browser';
import {Cv} from './cv';
import {Skill} from './skill/skill';
import {CvService} from './cv.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle = '';
  cv:Cv = null;
  filteredSkills:Skill[] = [];
  currentTheme=`dark-theme`;
  
  constructor(private cvService:CvService,
              private titleService:Title,
              private overlayContainer:OverlayContainer) {}

  ngOnInit(): void {

    this.overlayContainer.getContainerElement().classList.add(this.currentTheme);

    //load cv using cv service
    this.cvService.getCv().subscribe(
      cv => {
        this.cv = cv;
        this.filteredSkills = cv.skills;
        this.pageTitle = cv.name + `'s CV`;
        this.titleService.setTitle(this.pageTitle);
      }
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