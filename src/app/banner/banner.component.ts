import {Component, OnInit, Input, HostListener} from '@angular/core';
import { SocialNetworkLink } from '../cv.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  @Input () socialNetworkLinks: SocialNetworkLink[] = [];
  @Input () textUrl:            string = null;
  @Input () backgroundImg:      string = null;
  @Input () portraitImg:        string = null;

  // for large displays, the portrait is partially obscured by a text box using
  // absolute positioning. This means that it cannot easily be resized
  // automatically with, for example, a flex box
  // It is resized here to match its container height when the screen is resized
  @HostListener('window:resize', ['$event']) resizePortrait():void {

    window.requestAnimationFrame(() => {  // do after other resizing
      
      //get any portraits in the page (expect only 1)
      let portraits:HTMLCollectionOf<Element> = document.getElementsByClassName('app-banner-portrait');

      Array.from(portraits).forEach(portrait => {
        let container:HTMLElement = portrait.parentElement;
        if (container.classList.contains(`fixed-height`)) {
          (portrait as HTMLElement).style.height = `35vh`;
        }
        else {
          (portrait as HTMLElement).style.height = container.offsetHeight + `px`;
        }
      });
      
    });
  }

  constructor() {}
  ngOnInit() {}

}
