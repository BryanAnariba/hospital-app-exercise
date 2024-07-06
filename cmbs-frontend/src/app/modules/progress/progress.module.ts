import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProgressPageComponent } from './pages/progress-page/progress-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ProgressPageComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule
  ]
})
export class ProgressModule { }
