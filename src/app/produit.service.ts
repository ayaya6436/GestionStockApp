import { Injectable } from '@angular/core';
import { DetailProduit, Produit } from './produit/produit.model';
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
  detailTab: DetailProduit[] = [];
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
    const ligneId = this.produitTabs.find(tab => tab.nom == nomProduit);
    return ligneId;
  }

  getALProduitNom(){
    const ligneId = this.produitTabs.find(tab => tab.nom);
    return ligneId;
  }

  getProduitId(idProduit: String){
    const ligneId = this.produitTabs.find(tab => tab.nom == idProduit);
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
  //////////////////////////////////////////////produits details////////////////
getDetailProduitId( id:String){
  let produitId = this.getProduitId(id)
  const stkDt = this.detailTab.find(d => d.id == produitId?.id)

  return stkDt;
}

getElementProduit(){
  const  element = this.produitTabs.find(
    t => t.date &&  t.nom );
    return element;

}
////////////////////////////////////////////////stocks //////////////////////////////////////////////////
getStockId(id: number){
  let stockId = this.stockTab.find(stoc => stoc.id == id);
  return stockId;

}
getDetailStock(id: number){
  let stocId = this.getStockId(id);
  const stocDt = this.detailTab.find(stoc => stoc.id == stocId?.id);
  return stocDt;
}

getElementStock(){
  const  element = this.stockTab.find(
    t => t.quantite && t.prix_unitaire && t.montant);
    return element;

}

//////////////////////////////////////////////////entrees //////////////////////////////////////////////////

getEntreeId(id: number){
  let entreeId = this.entreeTab.find(entree => entree.id == id);
  return entreeId;

}
getEntreeDetail(id: number){
  let entreeId = this.getEntreeId(id);
  const enDt = this.detailTab.find(en => en.id == entreeId?.id);
  return enDt;
}

getElementEntree(){
  const  element = this.entreeTab.find(
    t => t.quantite && t.prix_unitaire && t.montant);
    return element;

}
////////////////////////////////////////////////////sortie detail////////////////////////////////

getSortieId(id: number){
  let sortieId = this.sortieTab.find(sortie => sortie.id == id);
  return sortieId;

}

getSortieDetail(id: number){
  let sortieId = this.getSortieId(id);
  const soDt = this.detailTab.find(so => so.id == sortieId?.id);
  return soDt;
}

getElementSortie(){
  const  element = this.sortieTab.find(
    t => t.quantite && t.prix_unitaire && t.montant);
    return element;

}

// :::::::::::::::::::::::::::::::::::::

updateQuantiteProduit(idP: String, quantite : number){
  const index = this.produitTabs.findIndex(pro => pro.nom == idP);
    this.produitTabs[index].quantite = this.produitTabs[index].quantite + quantite;

}
getAllNomProduitTabs(){
  
}
}
