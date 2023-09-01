import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideBarStatus: boolean = true; // Démarrez avec la sidebar ouverte par défaut
  showHeader: boolean = true;
  isSidebarReduced: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('/register') || event.url.includes('/forgot-password') || event.url.includes('/verify-email')) {
          this.sideBarStatus = false;
          this.showHeader = false;
        } else {
          this.showHeader = true;
          this.sideBarStatus = true;
        }
      }
    });
  }

  handleSideNavToggle(event: boolean) {
  if (this.sideBarStatus && event) {
    // Si la sidebar est ouverte et l'icône est cliquée, la réduire
    this.isSidebarReduced = true;
  } else {
    // Sinon, la sidebar est ouverte normalement
    this.isSidebarReduced = false;
    // this.sideBarStatus = event;
  }
}



}
