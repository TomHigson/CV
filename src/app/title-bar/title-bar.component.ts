import {Component,
        OnInit,
        Output,
        Input,
        EventEmitter,
        HostListener} from '@angular/core';
import {CvService}    from '../cv.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() cvOwnersName:string = null;
  @Input() lastModified:Date = null;
  @Input() cvOwnersEmail:string = null;
  @Input() currentTheme:string = null;
  @Output() themeChanged = new EventEmitter<string>();

  atTop:boolean = window.pageYOffset === 0;
  @HostListener("window:scroll", []) determineIfAtTop() {
    this.atTop = window.pageYOffset === 0;
  }

  constructor(private cvService:CvService) {}
  ngOnInit() {}

  toggleTheme():void {
    this.currentTheme = this.currentTheme===`dark-theme`?`light-theme`:`dark-theme`;
    this.themeChanged.emit(this.currentTheme);
  }
}