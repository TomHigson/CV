import { Component, OnInit, Input } from '@angular/core';
import { CvService } from '../cv.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @Input() job = null;

  constructor(private cvService:CvService) { }

  ngOnInit() { }

}
