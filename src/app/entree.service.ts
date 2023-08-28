import { Injectable } from '@angular/core';
import { Entree } from './entree/entree.model';

@Injectable({
  providedIn: 'root'
})
export class EntreeService {
  // private key: 'entreeStocks';

  entreeStockSessions: Entree[]= [];

  constructor() { }
  
  saveDataEntree(data: Entree){
    this.entreeStockSessions.push(data);
  }
  getDataEntree(){
    return this.entreeStockSessions;
  }
}
