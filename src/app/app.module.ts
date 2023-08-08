import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { WebsiteComponent } from './components/website.component';
import { WebsiteService } from './services/website.service';
import {HelpButtonComponent} from "./help-button/help-button.component";
import { CompareLogsComponent } from './compare-logs/compare-logs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    HelpButtonComponent,
    CompareLogsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebsiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
