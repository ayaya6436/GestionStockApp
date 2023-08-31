import { Injectable } from '@angular/core';
import { Stock } from './stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private key = 'stockEntrees';
  private lastId: number = 0;

  stocks: Stock[] = [];

  constructor() {
    const lastIdStock = sessionStorage.getItem('lastStockId');
    if (lastIdStock) {
      this.lastId = parseInt(lastIdStock, 10);
    }
   }
  
  saveData(data: Stock){
    this.lastId++;
    data.id = this.lastId;
    this.stocks.push(data);
    sessionStorage.setItem('lastStockId', this.lastId.toString());
     sessionStorage.setItem(this.key, JSON.stringify(data));
  }
  getStockById(isId: number): Stock | undefined {
    return this.stocks.find(stock => stock.id === isId);

  }
  updateStock(stockTrouver: number, montant : number){
    let stock = this.getStockById(stockTrouver);
    const index = this.stocks.findIndex(stoc => stoc.id == stock?.id);
    this.stocks[index].montant=montant;

  }
  updateQuantite( stockTrouver: number, quantite: number,){
    let stock = this.getStockById(quantite);
    const index = this.stocks.findIndex(stoc => stoc.id == stock?.id);
    this.stocks[index].quantite=quantite;
  }
  // getMontantStockById(): Stock | undefined {
  //   return this.stocks.find(stock=> stock.)
  // }
  getData(){
    return this.stocks;
  
}

getStockProduit(produit: String){
  
    const index = this.stocks.findIndex(stoc => stoc.produit == produit);
    this.stocks[index].produit=produit;
}
}

