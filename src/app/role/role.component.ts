import { Component, OnInit, Input } from '@angular/core';
import { CvService } from '../cv.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  @Input() role = null;

  constructor(private cvService:CvService) { }

  ngOnInit() {}

}