import { Injectable } from '@angular/core';
import { Sortie } from './sortie/sortie.model';
import { ProduitService } from './produit.service';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  sortieProduitService: Sortie[] = [];

  constructor(private produitService: ProduitService, stockService: StockService) {
    
  }

  getIdSortie(): Sortie | undefined {
    return this.sortieProduitService.find(sortieProduitService => sortieProduitService.number_stock.valueOf());
  }
  saveDataSortie(data: Sortie){
    this.sortieProduitService.push(data);
  }
  getDataSortie(){
    return this.sortieProduitService;
  }

  getSortieProduit(nomProduit: String){
    const lignProduit = this.sortieProduitService.find(tab => tab.produit == nomProduit);
    return lignProduit;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  getSortieByProduit(idProduit : any){
    return this.sortieProduitService.find(sortie => sortie.produit == idProduit);
  }
  
  updateSortieMontant(produit: String, montant:number){
    let prodSortie = this.getSortieByProduit(produit);
    const index = this.sortieProduitService.findIndex(e => e.produit == prodSortie?.produit);
    // this.sortieProduitService[index].montant=montant;

  }

  updateSortie(sortTab: String, montant: number) {
    console.log("hello");
    let storti = this.getSortieByProduitNom(sortTab);
    console.log(storti+ ": " + "sortie trouver");
    const index = this.sortieProduitService.findIndex(tabSort => tabSort.produit == storti?.produit);
    console.log("index" + index);
    this.sortieProduitService[index].montant = montant;
    console.log("i'm here");

}

getSortieByProduitNom(produit: String) {
  return this.sortieProduitService.find(tabSort => tabSort.produit == produit);

}

getAllSortieByProduit(idProduit : any){
  return this.sortieProduitService.filter(sortie => sortie.produit == idProduit);
}

}

