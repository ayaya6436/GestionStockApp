import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import {GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router ) { 
    
  }

  // login methode
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token','true');

      if(res.user?.emailVerified==true){
        this.router.navigate(['dashboard']);

      }else{
      this.router.navigate(['/verify-email']);

      }
    },err=>{
        alert(err.message);
        this.router.navigate(['/login']);
    });
  }

  //register methode
  register(email: string, password: string, nom: string, prenom: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential && userCredential.user) {
        const user = userCredential.user;
        user.updateProfile({
          displayName: nom + ' ' + prenom
        }).then(() => {
          alert("Inscription successful");
          this.router.navigate(['/login']);
          this.sendEmailForValidation(user);
        }).catch((err) => {
          alert(err.message);
          this.router.navigate(['/register']);
        });
      } else {
        alert("An error occurred during registration.");
        this.router.navigate(['/register']);
      }
    }).catch((err) => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }
  
  //deconnexion

  logout(){
    this.fireauth.signOut().then( ()=>{
     localStorage.removeItem('token')
     this.router.navigate(['/login']);

    }, err=>{
      alert(err.message);
    
    })
  }

  //forgotPassword
  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then( ()=>{
      this.router.navigate(['/verify-email']);
    
 
     }, err=>{
       alert(err.message);
     
     })
  }

  //send email
  sendEmailForValidation(user:any){
    user.sendEmailForValidation().then((res:any)=>{
      this.router.navigate(['/verify-email']);
    },(err:any)=>{
      alert(err.message);
    })
  }

  ConnexionGoogleUser(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    });
  }
}
