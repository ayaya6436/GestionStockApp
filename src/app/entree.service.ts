import { Injectable } from '@angular/core';
import { Entree } from './entree/entree.model';
import { Produit } from './produit/produit.model';

@Injectable({
  providedIn: 'root'
})
export class EntreeService {
  // private key: 'entreeStocks';

  entree: Entree[]= [];
  serviceProduit: Produit[]=[];

  constructor() { }
  
  saveDataEntree(data: Entree){
    this.entree.push(data);
  }
  getDataEntree(){
    return this.entree;
  }
  getProduitEntree(emtreeE: String){
    const entreeProduitValue = this.entree.find(e => e.produit === emtreeE);
    return entreeProduitValue;
  }

  getEntreeById(isId: number): Entree | undefined {
    return this.entree.find(stock => stock.id === isId);

  }
  updateEntree( id: number, montant : number){
    //let stock = this.getEntreeById(entreTrouver);
    const index = this.entree.findIndex(stoc => stoc.id == id);
    this.entree[index].montant=montant;

  }
  updateQuantite( stockTrouver: number, quantite: number,){
    let stock = this.getEntreeById(stockTrouver);
    const index = this.entree.findIndex(stoc => stoc.id == stock?.id);
    this.entree[index].quantite=quantite;
  }

  updateMontant(montant: number, produitIdTrouve: number){
    let entrProduct = this.getEntreeById(produitIdTrouve);
    const entrer = this.entree.findIndex(entrer => entrer.montant == entrProduct?.id);
    this.entree[entrer].montant=montant;
  }

}
