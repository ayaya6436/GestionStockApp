import { Injectable } from '@angular/core';
import { Produit } from './produit/produit.model';
import { Entree } from './entree/entree.model';
import { Stock } from './stock/stock.model';
import { Sortie } from './sortie/sortie.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produitTabs: Produit[] = [];
  entreeTab: Entree[] = [];
  stockTab: Stock[] = [];
  sortieTab: Sortie[] = [];
  constructor() { }

  saveDataProuit(data: Produit) {
    this.produitTabs.push(data);
  }
  // les donnees de la table produit
  getDataProduit() {
    return this.produitTabs;
  }
 // les donnees de la table etrees
  getDataEntree(){
    return this.entreeTab;
  }
  saveDataEntree(data: Entree){
    this.entreeTab.push(data);
  }
 // les donnees de la table stock
  getDataStock(){
    return this.stockTab;
  }
  saveDataStock(data: Stock){
    this.stockTab.push(data);
  }
 // les donnees de la table sorties
  getDataSortie(){
    return this.sortieTab;
  }
  saveDataSortie(data: Sortie){
    this.sortieTab.push(data);

  }
  
//recuperation des identifiants
  getProduitNom(nomProduit: String){
    const ligneId = this.produitTabs.find(tab => tab.nom === nomProduit);
    return ligneId;
  }

  updateEntree(nom: String ){
    let stock = this.getProduitNom(nom);
    const index = this.produitTabs.findIndex(stoc => stoc.nom == stock?.nom);
    this.produitTabs[index].nom=nom;

  }
  updateQuantite( nom: String, quantite: number,){
    let stock = this.getProduitNom(nom);
    const index = this.produitTabs.findIndex(stoc => stoc.id == stock?.id);
    this.produitTabs[index].quantite=quantite;
  }

  // rcuperations des donnes stock, sortie, entree


}
