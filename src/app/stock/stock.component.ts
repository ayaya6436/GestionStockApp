import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from './stock.model';
import { GeneratorIdService } from '../generator-id.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  
  stockEntree: Stock[] = [];
  currentDate = new Date();

  constructor(private stockService: StockService, private generatoIdService: GeneratorIdService) {}

  ngOnInit(){
    // this.loadStockData();
    this.stockEntree = this.stockService.getData();
  }
  printListeFournisseur() {
    var printWindow = window.open('', '_blank');
    var divToPrint = document.getElementById('divPrint');
  
    if (divToPrint) {
      const content = divToPrint.innerHTML;
  
      printWindow!.document.write(`
        <html>
          <head>
            <title>Imprimer la liste des fournisseurs</title>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
  
      printWindow!.print();
      printWindow!.close();
    }
}



}

