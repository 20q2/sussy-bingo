import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { AngularD3CloudModule } from 'angular-d3-cloud';

@NgModule({
  declarations: [    
    AppComponent,
    ErrorPageComponent,
    WordCloudComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    AngularD3CloudModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
