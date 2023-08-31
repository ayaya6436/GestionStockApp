import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any; // Déclarez la variable user

  constructor(private authService: AuthService) {} // Injectez le service AuthService

  ngOnInit(): void {
    // Utilisez le service AuthService pour récupérer les données de l'utilisateur depuis Firebase
    this.authService.getLoggedInUserInfo().subscribe(userInfo => {
      this.user = userInfo; // Affectez les données de l'utilisateur à la variable user
    });
  }
  logoutUser() {
    this.authService.logout(); 
  }
  

  
}
