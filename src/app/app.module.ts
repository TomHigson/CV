import {BrowserModule, Title}    from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule}                from '@angular/core';

import {HttpClientModule}        from '@angular/common/http';

import {MarkdownModule,
        MarkedOptions}           from 'ngx-markdown';

import {MatButtonModule}         from '@angular/material';
import {MatCardModule}           from '@angular/material/card';
import {MatToolbarModule}        from '@angular/material/toolbar';
import {MatDividerModule}        from '@angular/material/divider';
import {MatListModule}           from '@angular/material/list';
import {MatSelectModule}         from '@angular/material/select';
import {MatIconModule}           from '@angular/material/icon';
import {MatChipsModule}          from '@angular/material/chips';

import {FlexLayoutModule}        from '@angular/flex-layout';

import {AppComponent}            from './app.component';
import {JobComponent}            from './job/job.component';
import {RoleComponent}           from './role/role.component';
import {TitleBarComponent}       from './title-bar/title-bar.component';
import {NavBarComponent}         from './nav-bar/nav-bar.component';
import {TechListComponent}       from './tech-list/tech-list.component';

@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    RoleComponent,
    TitleBarComponent,
    NavBarComponent,
    TechListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions, useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        }
      }
    })
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }