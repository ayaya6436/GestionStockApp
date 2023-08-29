import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string ='';

  constructor(private  auth :AuthService){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');

  }

  forgotPassword(){
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

}
