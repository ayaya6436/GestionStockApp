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
    const lignProduit = this.sortieProduitService.find(tab => tab.produit === nomProduit);
    return lignProduit;
  }
  

}

