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
  getStockByProduitNom(produit: String) {
    return this.stocks.find(stock => stock.produit == produit);

  }
  updateStock(stockTrouver: String, montant: number) {
    console.log("hello");
    let stock = this.getStockByProduitNom(stockTrouver);
    const index = this.stocks.findIndex(stoc => stoc.produit == stock?.produit);
    console.log("index" + index);
    this.stocks[index].montant = montant;
    console.log("i'm here");

  }
  updateQuantite(stockTrouver: String, quantite: number,) {
    let stock = this.getStockByProduitNom(stockTrouver);
    const index = this.stocks.findIndex(stoc => stoc.produit == stock?.produit);
    this.stocks[index].quantite = quantite;
  }
  // getMontantStockById(): Stock | undefined {
  //   return this.stocks.find(stock=> stock.)
  // }
  getData() {
    return this.stocks;

  }

  getStockProduit(produit: String) {
    //const index = this.stocks.findIndex(stoc => stoc.produit == produit);
    return this.stocks.find(el => el.produit == produit);
  }

  getQuantity(produit: String, quantiStock: number) {
    let stock = this.getStockProduit(produit);
    const index = this.stocks.findIndex(stoc => stoc.produit == stock?.produit);
    this.stocks[index].quantite = quantiStock;
  }

  newMontant(produit: String, montant: number) {
    let produitTab = this.getStockByProduitNom(produit);
    const index = this.stocks.findIndex(stoc => stoc.produit == produitTab?.produit);
    console.log(this.stocks[index])
    //this.stocks[index].montant = montant;

  }

  getProduitById(id: number) {
    return this.produitTab.find(produit => produit.id == id);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  updateEntreeNewMontant( ProduitId: String, montant: number) {
    let produitTab = this.getStockByProduitNom(ProduitId);
    console.log(produitTab + ": " + "produit id trouver");
    const index = this.stocks.findIndex(stoc => stoc.produit  == produitTab?.produit);
    console.log(index + ": " + "produit trouver");
     this.stocks[index].montant = montant;
    console.log(this.stocks[index]+": " + "idex trouver");
}
  /////////////////////////////////////////////////////////////////////////////////////////////////
  getStockByIdProduit(idP : String){
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
