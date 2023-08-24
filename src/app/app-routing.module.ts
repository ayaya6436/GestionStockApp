import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitComponent } from './produit/produit.component';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';

//Routing entre les differentes pages
const routes: Routes = [
  {path: '',component:DashboardComponent},
  {path: '/produit',component:ProduitComponent},
  {path:'/entree',component:EntreeComponent},
  {path:'/sortie',component:SortieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
