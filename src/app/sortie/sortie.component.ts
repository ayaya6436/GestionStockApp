import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { Sortie } from './sortie.model';
import { StockService } from '../stock.service';
import { SortieService } from '../sortie.service';
import { GeneratorIdService } from '../generator-id.service';


@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  sortieProduit: FormGroup;
  // lastId: number = 0;
  sorties: Sortie[] = [];
  selectedSortie: Sortie | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  ngOnInit() {
    this.sortieService.getDataSortie();
  }

  constructor(private fb: FormBuilder, private stockService: StockService, private sortieService: SortieService, private generatorIdService: GeneratorIdService) {
    this.sortieProduit = this.fb.group({
      date: [new Date(), Validators.required],
      quantite: [0, Validators.required],
      number_stock: [0, Validators.required],
      prix_unitaire: [0, Validators.required],
      montant: [0, Validators.required],
      produit: ['', Validators.required],
      description: ['', Validators.required],

    });

  }

  submit() {
    if (this.sortieProduit.valid) {
      const stockExists = this.stockService.getStockById(this.sortieProduit.value.number_stock);

      console.log(stockExists + "je trouver stock")
      if (stockExists != null) {
        const sortiMontant = this.sortieProduit.value.montant;
        const quantiteSortie = this.sortieProduit.value.quantite;
        const montQuantity = stockExists.quantite - quantiteSortie;
        
         console.log( montQuantity+ "quantite modifier");
        const monontantsortieStock = stockExists.montant - sortiMontant;
        this.stockService.updateStock(stockExists.id, monontantsortieStock);
        this.stockService.updateQuantite(stockExists.id, montQuantity);

        console.log(monontantsortieStock + " stock updated");


        const newSortie: Sortie = this.sortieProduit.value;
        if(!this.isedit){
          newSortie.id = this.generatorIdService.generateNewId();
        }
        console.log(newSortie.id,"id trouver")
        if (this.isedit && this.selectedSortie) {
          Object.assign(this.selectedSortie, newSortie);
          console.log("je suis dans element stock");
        } else {
          
        }
        console.log(newSortie);
        this.sorties.push(newSortie);
        this.sortieService.saveDataSortie(newSortie);
        
        
        this.selectedSortie = undefined;
        this.isedit = false;

      }

    }
  }

  deleteSortie(index: number) {
    this.sorties.splice(index, 1);
  }

  addmodel(sortie?: Sortie) {

    if (sortie) {
      this.selectedSortie = { ...sortie };
      this.isedit = true;
    } else {
      this.selectedSortie = undefined;
      this.isedit = false;
    }
  }
}
