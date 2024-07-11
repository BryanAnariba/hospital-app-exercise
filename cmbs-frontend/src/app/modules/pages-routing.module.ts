import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        data: { title: 'Users' },
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
        data: { title: 'Doctors' },
      },
      {
        path: 'hospitals',
        loadChildren: () =>
          import('./hospitals/hospitals.module').then((m) => m.HospitalsModule),
        data: { title: 'Hospitals' },
      },
      {
        path: 'graphics',
        loadChildren: () =>
          import('./graphics/graphics.module').then((m) => m.GraphicsModule),
        data: { title: 'Graphics' },
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./progress/progress.module').then((m) => m.ProgressModule),
        data: { title: '' },
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user-account/user-account.module').then(
            (m) => m.UserAccountModule
          ),
        data: { title: 'Profile' },
      },
      {
        path: 'promises',
        loadChildren: () =>
          import('./promises/promises.module').then((m) => m.PromisesModule),
        data: { title: 'Promises' },
      },
      { path: '**', redirectTo: 'profile', data: { title: 'Profile' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
