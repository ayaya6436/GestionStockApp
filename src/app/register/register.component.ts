import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  nom: string='';
  prenom: string='';

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  constructor(private auth : AuthService){}

  register(){
    if(this.nom==''){
      alert('Veuillez entrer le nom');
      return;
    }
    if(this.prenom==''){
      alert('Veuillez entrer le prenom');
      return;
    }
    if(this.email==''){
      alert('Veuillez entrer l\'email');
      return;
    }

    if(this.password==''){
      alert('Veuillez entrer le mot de passe');
      return;

    }
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
    this.nom = '';
    this.prenom = '';

  }

}
