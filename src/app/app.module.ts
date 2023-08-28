import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './produit/produit.component';
import { EntreeComponent } from './entree/entree.component';
import { SortieComponent } from './sortie/sortie.component';
import { StockComponent } from './stock/stock.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//importation de toolbar (materialAngular)
import {MatToolbarModule} from '@angular/material/toolbar';
//importation de Icon (materialAngular)
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    EntreeComponent,
    SortieComponent,
    StockComponent,
    FournisseurComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton:true,
      timeOut:1000,
      progressBar:true,
      
     
    }),
    
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
