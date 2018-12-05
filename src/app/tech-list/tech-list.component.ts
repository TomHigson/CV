import { Component, OnInit, Input } from '@angular/core';
import { Technology } from '../cv.service';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.scss']
})
export class TechListComponent implements OnInit {
  @Input() techs:Technology[] = [];

  constructor() {}

  ngOnInit() {}

}