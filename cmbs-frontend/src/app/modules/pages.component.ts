import { Component, OnInit } from '@angular/core';
import { SettingsService } from './user-account/services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {

  ngOnInit(): void {}
  constructor (private readonly settingsService: SettingsService) {}
}
