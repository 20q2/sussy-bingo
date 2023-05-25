import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
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
