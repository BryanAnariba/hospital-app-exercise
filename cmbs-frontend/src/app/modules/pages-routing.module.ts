import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'doctors', loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule) },
      { path: 'hospitals', loadChildren: () => import('./hospitals/hospitals.module').then(m => m.HospitalsModule) },
      { path: 'graphics', loadChildren: () => import('./graphics/graphics.module').then(m => m.GraphicsModule) },
      { path: 'progress', loadChildren: () => import('./progress/progress.module').then(m => m.ProgressModule) },
      { path: 'profile', loadChildren: () => import('./user-account/user-account.module').then(m => m.UserAccountModule) },
      { path: 'promises', loadChildren: () => import('./promises/promises.module').then(m => m.PromisesModule) },
      { path: '**', redirectTo: 'profile' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
