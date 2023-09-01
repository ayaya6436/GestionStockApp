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

  saveData(data: Stock) {
    this.lastId++;
    data.id = this.lastId;
    this.stocks.push(data);
    sessionStorage.setItem('lastStockId', this.lastId.toString());
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }
  getStockById(isId: number): Stock | undefined {
    return this.stocks.find(stock => stock.id === isId);

  }
  getStockByNom(produit: number) {
    return this.stocks.find(stock => stock.produit == produit);

  }
  updateStock(stockTrouver: number, montant: number) {
    console.log("hello");
    let stock = this.getStockById(stockTrouver);
    const index = this.stocks.findIndex(stoc => stoc.id == stock?.id);
    console.log("index" + index);
    this.stocks[index].montant = montant;
    console.log("i'm here");

  }
  updateQuantite(stockTrouver: number, quantite: number,) {
    let stock = this.getStockById(quantite);
    const index = this.stocks.findIndex(stoc => stoc.id == stock?.id);
    this.stocks[index].quantite = quantite;
  }
  // getMontantStockById(): Stock | undefined {
  //   return this.stocks.find(stock=> stock.)
  // }
  getData() {
    return this.stocks;

  }

  getStockProduit(produit: number) {
    //const index = this.stocks.findIndex(stoc => stoc.produit == produit);
    return this.stocks.find(el => el.produit == produit);
  }

  getQuantity(produit: number, quantiStock: number) {
    let stock = this.getStockProduit(produit);
    const index = this.stocks.findIndex(stoc => stoc.produit == stock?.produit);
    this.stocks[index].quantite = quantiStock;
  }

  newMontant(id: number, montant: number) {
    let stock = this.getStockById(id);
    const index = this.stocks.findIndex(stoc => stoc.produit == stock?.produit);
    console.log(this.stocks[index])
    this.stocks[index].montant = montant;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  updateEntreeNewMontant( ProduitId: number, montant: number) {
    let prodTab = this.getStockById(ProduitId);
    console.log(prodTab + ": " + "produit id trouver");
    const index = this.stocks.findIndex(stoc => stoc.produit  == prodTab?.id);
    console.log(index + ": " + "produit trouver");
    // this.entree[index].montant = montant;
    console.log(this.stocks[index]+": " + "idex trouver");
  
}
}
