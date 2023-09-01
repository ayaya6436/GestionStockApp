import { Injectable } from '@angular/core';
import { Stock } from './stock/stock.model';
import { Produit } from './produit/produit.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private key = 'stockEntrees';
  private lastId: number = 0;

  stocks: Stock[] = [];
  produitTab: Produit[]= [];

  constructor() {
    // const lastIdStock = sessionStorage.getItem('lastStockId');
    // if (lastIdStock) {
    //   this.lastId = parseInt(lastIdStock, 10);
    // }
  }

  saveData(data: Stock) {
    this.lastId++;
    data.id = this.lastId;
    this.stocks.push(data);
    sessionStorage.setItem('lastStockId', this.lastId.toString());
    sessionStorage.setItem(this.key, JSON.stringify(data));
  }
  getStockById(isId: number) {
    return this.stocks.find(stock => stock.id == isId);

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
    let produitTab = this.getProduitById(id);
    const index = this.stocks.findIndex(stoc => stoc.produit == produitTab?.id);
    console.log(this.stocks[index])
    //this.stocks[index].montant = montant;

  }

  getProduitById(id: number) {
    return this.produitTab.find(produit => produit.id == id);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  updateEntreeNewMontant( ProduitId: number, montant: number) {
    let produitTab = this.getProduitById(ProduitId);
    console.log(produitTab + ": " + "produit id trouver");
    const index = this.stocks.findIndex(stoc => stoc.produit  == produitTab?.id);
    console.log(index + ": " + "produit trouver");
     this.stocks[index].montant = montant;
    console.log(this.stocks[index]+": " + "idex trouver");
}
  /////////////////////////////////////////////////////////////////////////////////////////////////
  getStockByIdProduit(idP : number){
    return this.stocks.find(stoc => stoc.produit == idP)
  }

  updateOldStock(stock : Stock){
    const index = this.stocks.findIndex(stk => stk.id == stock.id);
    this.stocks[index] = stock;
  }

  getAllStockByProduit(idProduit : any){
    return this.stocks.filter(stock=> stock.produit == idProduit);
  }
}
