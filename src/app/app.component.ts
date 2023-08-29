import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideBarStatus: boolean = false; // Par défaut, la barre latérale est fermée

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/login') || event.url.includes('/register') || event.url.includes('/forgot-password') || event.url.includes('/verify-email')) {
          this.sideBarStatus = false;
        } else if (!this.sideBarStatus) {
          this.sideBarStatus = true;
        }
      }
    });
  }


}
