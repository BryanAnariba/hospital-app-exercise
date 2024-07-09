import { Injectable } from '@angular/core';
import { Menu } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: Menu[] = [
    { 
      title: 'Dashboard', 
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Main', url: './' },
        { title: 'Progress', url: '/dashboard/progress' },
        { title: 'Users', url: '/dashboard/users' },
        { title: 'Doctors', url: '/dashboard/doctors' },
        { title: 'Hospitals', url: '/dashboard/hospitals' },
      ],
    },
  ];

  constructor() { }
}
