import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { PopupProduitComponent } from './popup-produit/popup-produit.component';


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
    PopupComponent,
    PopupProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
