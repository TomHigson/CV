import {Component, OnInit, Input} from '@angular/core';
import {SocialNetworkLink}        from '../cv.service';

@Component({
  selector: 'app-social-network-links',
  templateUrl: './social-network-links.component.html',
  styleUrls: ['./social-network-links.component.scss']
})
export class SocialNetworkLinksComponent implements OnInit {
  @Input () socialNetworkLinks:SocialNetworkLink[] = [];

  constructor() {}
  ngOnInit() {}

}