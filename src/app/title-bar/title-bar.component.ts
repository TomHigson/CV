import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() cvOwnersName:string = null;
  @Input() cvOwnersEmail:string = null;
  @Input() currentTheme:string = null;
  @Output() themeChanged = new EventEmitter<string>();

  constructor() {}
  ngOnInit() {}

  toggleTheme() {
    this.currentTheme = this.currentTheme===`dark-theme`?`light-theme`:`dark-theme`;
    this.themeChanged.emit(this.currentTheme);
  }
}
