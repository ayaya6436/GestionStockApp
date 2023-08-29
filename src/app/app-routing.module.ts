import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitComponent } from './produit/produit.component';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { UserComponent } from './user/user.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { StockComponent } from './stock/stock.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

//Routing entre les differentes pages
const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch:'full'},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'produit',component:ProduitComponent},
  {path:'entree',component:EntreeComponent},
  {path:'sortie',component:SortieComponent},
  {path:'user',component:UserComponent},
  {path:'fournisseur',component:FournisseurComponent},
  {path:'stock',component:StockComponent},
  {path:'verify-email',component:VerifyEmailComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
