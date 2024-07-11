import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressPageComponent } from './pages/progress-page/progress-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProgressPageComponent,
    data: {title: 'Progress'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressRoutingModule { }
