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

  // the portrait is absolute position as it is partially obscured by the text box
  // This means that it cannot be resized automatically as part of a flex box
  // Instead, it is resized here to match any container resized on screen resize
  @HostListener('window:resize', ['$event']) resizePortrait():void {

    //get the height of the banner. If there are multiple, just use first one
    let banners:HTMLCollectionOf<Element> = document.getElementsByClassName(`app-banner-background`);
    let targetHeight:number = null;
    if(banners.length) targetHeight=(banners[0] as HTMLElement).offsetHeight;
    
    //set the image height to be the same
    let portraits:HTMLCollectionOf<Element> = document.getElementsByClassName('app-banner-portrait');
    Array.from(portraits).forEach(portrait => (portrait as HTMLElement).style.height = targetHeight + `px`);

  }

  constructor() {}
  ngOnInit() {}

}
