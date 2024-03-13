import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule,MatListModule, RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  dashboardactiveColor: string = '#18385C';
  dashboardbg: string = '#ffffff';
  petsactiveColor: string = '#ffffff';
  petsbg: string = '';
  profileactiveColor: string = '#ffffff';
  profilebg: string = '';

  handleMenuItemClick(menuItem: string): void {
    this.resetMenuItems();

    switch (menuItem) {
      case 'dashboard':
        this.dashboardactiveColor = '#18385C';
        this.dashboardbg = '#ffffff';
        break;
      case 'pets':
        this.petsactiveColor = '#18385C';
        this.petsbg = '#ffffff';
        break;
      case 'profile':
        this.profileactiveColor = '#18385C';
        this.profilebg = '#ffffff';
        break;
    }
  }

  resetMenuItems(): void {
    this.dashboardactiveColor = '#ffffff';
    this.dashboardbg = '';
    this.petsactiveColor = '#ffffff';
    this.petsbg = '';
    this.profileactiveColor = '#ffffff';
    this.profilebg = '';
  }
}
