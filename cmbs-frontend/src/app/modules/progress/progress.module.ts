import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProgressPageComponent } from './pages/progress-page/progress-page.component';
import { FormsModule } from '@angular/forms';
import { ProgressComponent } from './components/progress/progress.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ProgressPageComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    FormsModule
  ]
})
export class ProgressModule { }
