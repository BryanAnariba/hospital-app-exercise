import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit {

  constructor (private readonly settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.addCheckCurrentThemeSelected();
  }

  public onChangeTheme (theme: string): void {
    this.settingsService.changeTheme(theme);
  }
}
