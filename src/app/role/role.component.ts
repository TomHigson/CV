import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CvService, Role}                                from '../cv.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @Input() role:Role = null;
  @Output () load = new EventEmitter<Role>();

  constructor(private cvService:CvService) { }
  ngOnInit() {}

  /**Notifies the parent component that the text content of the 
   * component has loaded. The emitted event contains a reference
   * to the Role */
  loadComplete ():void {
    this.load.emit(this.role);
  }

}