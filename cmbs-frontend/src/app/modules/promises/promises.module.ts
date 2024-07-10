import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromisesRoutingModule } from './promises-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PromisePageComponent } from './pages/promise-page/promise-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    PromisePageComponent
  ],
  imports: [
    CommonModule,
    PromisesRoutingModule
  ]
})
export class PromisesModule { }
