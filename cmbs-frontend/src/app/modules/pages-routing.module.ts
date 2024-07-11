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
        data: { title: 'Users' },
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'doctors',
        data: { title: 'Doctors' },
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
      },
      {
        path: 'hospitals',
        data: { title: 'Hospitals' },
        loadChildren: () =>
          import('./hospitals/hospitals.module').then((m) => m.HospitalsModule),
      },
      {
        path: 'graphics',
        data: { title: 'Graphics' },
        loadChildren: () =>
          import('./graphics/graphics.module').then((m) => m.GraphicsModule),
      },
      {
        path: 'progress',
        data: { title: '' },
        loadChildren: () =>
          import('./progress/progress.module').then((m) => m.ProgressModule),
      },
      {
        path: 'profile',
        data: { title: 'Profile' },
        loadChildren: () =>
          import('./user-account/user-account.module').then(
            (m) => m.UserAccountModule
          ),
      },
      {
        path: 'promises',
        data: { title: 'Promises' },
        loadChildren: () =>
          import('./promises/promises.module').then((m) => m.PromisesModule),
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
