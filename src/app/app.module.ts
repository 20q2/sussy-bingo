import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TokensService } from './services/tokens.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { PlayerComponent } from './pages/player/player.component';
import { HostComponent } from './pages/host/host.component';
import { CloudComponent } from './pages/cloud/cloud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WordCloudComponent } from './components/word-cloud/word-cloud.component';
import { AngularD3CloudModule } from 'angular-d3-cloud';
import { DotsPipe } from './pipes/dots-pipe.pipe';
import { TokenAvatarComponent } from './components/token-avatar/token-avatar.component';
import { TokenPickerComponent } from './components/token-picker/token-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    WordCloudComponent,
    DotsPipe,
    LandingComponent,
    PlayerComponent,
    HostComponent,
    CloudComponent,
    TokenAvatarComponent,
    TokenPickerComponent,
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
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [TokensService],
      useFactory: (svc: TokensService) => () => svc.load(),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
