import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ProfilePageComponent,
    SettingsPageComponent,
  ],
  imports: [
    CommonModule,
    UserAccountRoutingModule
  ]
})
export class UserAccountModule { }
