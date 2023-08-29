import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideBarStatus: boolean = false; // Par défaut, la barre latérale est fermée
  showHeader: boolean = true; // Par défaut, afficher le header

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('/register') || event.url.includes('/forgot-password')) {
          this.sideBarStatus = false;
          this.showHeader = false; // Masquer le header sur les pages de connexion, d'inscription et de réinitialisation du mot de passe
        } else {
          this.sideBarStatus = true;
          this.showHeader = true; // Afficher le header sur les autres pages
        }
      }
    });
  }
}
