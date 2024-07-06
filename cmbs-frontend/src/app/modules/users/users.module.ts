import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ViewPageComponent } from './pages/view-page/view-page.component';
import { CreateUpdatePageComponent } from './pages/create-update-page/create-update-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    ViewPageComponent,
    CreateUpdatePageComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
