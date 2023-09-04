import { Injectable } from '@angular/core';
import { Entree } from './entree/entree.model';
import { Produit } from './produit/produit.model';

@Injectable({
  providedIn: 'root'
})
export class EntreeService {
  // private key: 'entreeStocks';

  entree: Entree[] = [];
  serviceProduit: Produit[] = [];

  constructor() { }

  saveDataEntree(data: Entree) {
    this.entree.push(data);
  }
  getDataEntree() {
    return this.entree;
  }
  getProduitEntree(emtreeE: String) {
    const entreeProduitValue = this.entree.find(e => e.produit == emtreeE);
    return entreeProduitValue;
  }

  getEntreeByProduit(produit: String) {
    const idP = this.entree.find(e => e.produit == produit)
    // this.entree.forEach(el => {
    //   console.log(el.id + "  er  " + isId)
    //   if (el.id == isId) {

    //     ent = el;
    //   }
    // });
    console.log(idP+ "entredicated id");
    return idP;
   
  }
  getProduitById(id: number){
    return this.serviceProduit.find(el => el.id == id)
  }
  updateEntreeNewMontant( ProduitId: String, montant: number) {
    let prodTab = this.getEntreeByProduit(ProduitId);
    console.log(prodTab + ": " + "produit id trouver");
    const index = this.entree.findIndex(stoc => stoc.produit  == prodTab?.produit);
    console.log(index + ": " + "produit trouver");
    // this.entree[index].montant = montant;
    console.log(this.entree[index]+": " + "idex trouver");

  }
  updateQuantite(stockTrouver: String, quantite: number,) {
    let stock = this.getEntreeByProduit(stockTrouver);
    const index = this.entree.findIndex(entre => entre.produit == stock?.produit);
    this.entree[index].quantite = quantite;
  }

  // updateMontant(montant: number, produitIdTrouve: String) {
  //   let entrProduct = this.getEntreeByProduit(produitIdTrouve);
  //   const entrer = this.entree.findIndex(entrer => entrer.montant == entrProduct?.id);
  //   this.entree[entrer].montant = montant;
  //}

  updateMontantEntree(productEnt: String, montant: number) {
    let entree = this.getEntreeProduit(productEnt);
    const entrer = this.entree.findIndex(entrer => entrer.produit == entree?.produit);
    this.entree[entrer].montant = montant;
  }

  getEntreeProduit(product: String) {
    return this.entree.find(entree => entree.produit == product);

  }
  //modification ada commente tout
  updateMontantEntre(idP: String, montant: number) {
    let entree = this.getEntreeProduit(idP);
    const entrer = this.entree.findIndex(entrer => entrer.produit == entree?.produit);
    this.entree[entrer].montant = montant;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  getEntreByProduit(idProduit : any){
    return this.entree.find(entre => entre.produit == idProduit);
  }

  getAllEntreByProduit(idProduit : any){
    console.log(this.entree.filter(entre => entre.produit == idProduit))
    return this.entree.filter(entre => entre.produit == idProduit);
  }
}
