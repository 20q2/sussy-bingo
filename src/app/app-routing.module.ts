import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
];

// const routes: Routes = [  
//   {
//     path: 'home',
//     loadChildren: () => import('./app.component').then((m) => m.AppComponent),
//   },
//   {
//     path: 'test',
//     loadChildren: () => import('./components/test-page/test-page.component').then((m) => m.TestPageComponent),
//   },
//   {
//     path: 'error',
//     loadChildren: () => import('./components/error-page/error-page.component').then((m) => m.ErrorPageComponent),
//   },
//   {
//     path: '**',
//     redirectTo: 'error',
//     pathMatch: 'full'
//   }  
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
