import { Component, OnInit } from '@angular/core';
import { SettingsService } from './user-account/services/settings.service';

// Sin esto no funciona el sidebar ni menu hamburguesa bien, ponelo en el init para cargar el js, el js se encuentra en custom.js
declare function customInitFunction(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {

  ngOnInit(): void {
    customInitFunction();
  }

  constructor (private readonly settingsService: SettingsService) {}
}
