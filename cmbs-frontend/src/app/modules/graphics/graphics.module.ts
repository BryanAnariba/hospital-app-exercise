import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    GraphicsPageComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule
  ]
})
export class GraphicsModule { }
