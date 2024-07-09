import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Menu } from '../../interfaces';

@Component({
  selector: 'app-shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public menuItems: Menu[] = [];

  constructor (private readonly sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
  }
}
