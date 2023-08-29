import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  list=[
    {
      number : '1',
      name:'imageVectorLogin',
      image:'../assets/loginImage.png'
    }
    
  ];
//les attributs
  email: string='';
  password: string='';
  showHeaderAndSidebar: boolean = false;

  constructor(private auth: AuthService){}
  ngOnInit(): void {
    this.showHeaderAndSidebar = false;
  }

  login(){
    if(this.email==''){
      alert('Veuillez entrer l\'email');
      return;
    }

    if(this.password==''){
      alert('Veuillez entrer le mot de passe');
      return;

    }
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';

  }

}
