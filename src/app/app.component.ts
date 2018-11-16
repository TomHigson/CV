import {Component, OnInit} from '@angular/core';
import {Cv} from './cv';
import {Skill} from './Skill';
import {CvService} from './cv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = '';
  cv:Cv = null;
  filteredSkills:Skill[] = [];
  
  constructor(private cvService:CvService) {}

  ngOnInit(): void {

    //load cv using cv service
    this.cvService.getCv().subscribe(
      cv => {
        this.cv = cv;
        this.filteredSkills = cv.skills;
        this.pageTitle = cv.name + `'s CV`;
      }
    );
  }
}