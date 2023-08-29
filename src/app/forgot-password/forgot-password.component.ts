import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string ='';
  showHeaderAndSidebar: boolean = false;


  constructor(private  auth :AuthService){

  }
  ngOnInit(): void {
    this.showHeaderAndSidebar = false;


  }

  forgotPassword(){
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

}
