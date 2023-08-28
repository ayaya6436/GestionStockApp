import { Injectable } from '@angular/core';
import { Stock } from './stock/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private key = 'stockEntrees';

  stocks: Stock[] = [];

  constructor() { }
  
  saveData(data: Stock){
    this.stocks.push(data);
    // sessionStorage.setItem(this.key, JSON.stringify(data));
  }

  getData(){
    return this.stocks;
  //   const donneStocker = sessionStorage.getItem(this.key) || null;
  //   if(donneStocker) {
  //     return JSON.parse(donneStocker);
  // }else{
  //   return null;
  // }
}
}
