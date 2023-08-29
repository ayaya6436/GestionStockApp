import { Injectable } from '@angular/core';
import { Produit } from './produit/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produitTabs: Produit[] = [];
  constructor() { }

  saveDataProuit(data: Produit) {
    this.produitTabs.push(data);
  }
  getDataProduit() {
    return this.produitTabs;
  }
}
