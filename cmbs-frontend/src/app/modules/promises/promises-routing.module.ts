import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PromisePageComponent } from './pages/promise-page/promise-page.component';
import { RxjsPageComponent } from './pages/rxjs-page/rxjs-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'example', component: PromisePageComponent, data: {title: 'example'} },
      { path: 'rxjs', component: RxjsPageComponent, data: {title: 'rxjs'} },
      { path: '**', redirectTo: 'example' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromisesRoutingModule { }
