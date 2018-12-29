import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SocialNetworkLinksComponent} from './social-network-links.component';

describe('SocialnetworkLinksComponent', () => {
  let component: SocialNetworkLinksComponent;
  let fixture: ComponentFixture<SocialNetworkLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialNetworkLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworkLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
