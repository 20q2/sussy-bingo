import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { PlayerComponent } from './pages/player/player.component';
import { HostComponent } from './pages/host/host.component';
import { CloudComponent } from './pages/cloud/cloud.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingComponent },
  { path: 'play', component: PlayerComponent },
  { path: 'host', component: HostComponent },
  { path: 'cloud', component: CloudComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
