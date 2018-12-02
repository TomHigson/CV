import { Component, OnInit, Input } from '@angular/core';
import { CvService, Job } from '../cv.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @Input() job:Job = null;

  constructor(private cvService:CvService) { }

  ngOnInit() { }

}
