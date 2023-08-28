import { Injectable } from '@angular/core';
import { Sortie } from './sortie/sortie.model';

@Injectable({
  providedIn: 'root'
})
export class SortieService {

  sortieProduitService: Sortie[] = [];

  constructor() { }

  getIdSortie(): Sortie | undefined {
    return this.sortieProduitService.find(sortieProduitService => sortieProduitService.number_stock.valueOf());
  }
  saveDataSortie(data: Sortie){
    this.sortieProduitService.push(data);
  }
  getDataSortie(){
    return this.sortieProduitService;
  }
}

