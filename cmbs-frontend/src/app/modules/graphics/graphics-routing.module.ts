import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';

const routes: Routes = [
  {
    path: '',
    component: GraphicsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphicsRoutingModule { }
