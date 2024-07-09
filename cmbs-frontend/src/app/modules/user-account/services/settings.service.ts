import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultThemeUrl: string = './assets/css/colors/default-dark.css';
  private linkTheme = document.querySelector('#theme');
  public links: any;

  constructor() { 
    if (localStorage.getItem('url-theme')) this.defaultThemeUrl = localStorage.getItem('url-theme')!;
    this.linkTheme!.setAttribute('href', this.defaultThemeUrl);  
  }

  public changeTheme (theme: string): void {
    const url: string = `./assets/css/colors/${theme}.css`;
    // console.log({url});
    this.linkTheme!.setAttribute('href', url);    
    localStorage.setItem('url-theme', url);
    this.addCheckCurrentThemeSelected();
  }

  public addCheckCurrentThemeSelected (): void {
    this.links = document.querySelectorAll('.selector');
    this.links.forEach((theme: any) => {
      const btnTheme = theme.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme!.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        theme.classList.add('working');
      } else {
        theme.classList.remove('working');
      }
    });
  }
}
