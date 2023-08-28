import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from './stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockEntree: Stock[] = [];
  currentDate = new Date();

  constructor(private stockService: StockService) {}

  ngOnInit(){
    // this.loadStockData();
    this.stockEntree = this.stockService.getData();
  }
  
  // loadStockData(){
  //   this.stockEntree = this.stockService.getData() || [];
  //   console.log(this.stockEntree);
  // }
 
  // onClickA() {
  //   const newStockEntry: Stock = {
  //     // Initialiser les propriétés de la nouvelle entrée ici
  //     date: new Date(),
  //     quantite: 0,
  //     prix_unitaire: 0,
  //     montant: 0,
  //     produit: '',
  //     description: ''
  //   };

  //   this.stockEntree.push(newStockEntry);
  //   console.log(newStockEntry);


}

