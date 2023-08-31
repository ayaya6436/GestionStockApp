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
  



}

