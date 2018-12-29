import {Component, OnInit, Input, HostListener} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{
  @Input () twitter:       string = null;
  @Input () linkedIn:      string = null;
  @Input () gitHub:        string = null;
  @Input () textUrl:       string = null;
  @Input () backgroundImg: string = null;
  @Input () portraitImg:   string = null;

  // the portrait is absolute position as it is partially obscured by the text box
  // This means that it cannot be resized automatically as part of a flex box
  // Instead, it is resized here to match any container resized on screen resize
  @HostListener('window:resize', ['$event']) resizePortrait():void {

    //get the height of the text box
    let textBoxes:HTMLCollectionOf<Element> = document.getElementsByClassName(`app-banner-content`);
    let targetHeight:number = null;
    if(textBoxes.length) targetHeight=(textBoxes[0] as HTMLElement).offsetHeight;

    //set the image height to be the same
    let portraits:HTMLCollectionOf<Element> = document.getElementsByClassName('app-banner-portrait');
    Array.from(portraits).forEach(portrait => (portrait as HTMLElement).style.height = targetHeight + `px`);

  }

  constructor() {}
  ngOnInit() {}

}
