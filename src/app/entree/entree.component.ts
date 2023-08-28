import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Entree } from './entree.model';
import { StockService } from '../stock.service';
import { Stock } from '../stock/stock.model';
import { EntreeService } from '../entree.service';

@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrls: ['./entree.component.css']
})
export class EntreeComponent implements OnInit {
  entreeProduit: FormGroup | any;
  entrees: Entree[] = [];
  selectedEntree: Entree | undefined;
  currentDate = new Date();
  isedit: boolean = false;


  ngOnInit(): void {
    // const stokerDonner = sessionStorage.getItem("entreeDonner");
    // if (stokerDonner) {
    //   this.entrees = JSON.parse(stokerDonner);
    // }
    this.entrees = this.entreeService.getDataEntree();
  }

  constructor(private fb: FormBuilder, private stockService: StockService, private entreeService: EntreeService) {

    this.entreeProduit = this.fb.group({
      // numero: [0, Validators.required],
      date: [new Date(), Validators.required],
      quantite: [0, Validators.required],
      prix_unitaire: [0, Validators.required],
      montant: [0, Validators.required],
      produit: ['', Validators.required],
      fournisseur: ['', Validators.required],
      description: ['', Validators.required],

    });
  }
  submit() {
    if (this.entreeProduit.valid) {
      // let ids = sessionStorage.getItem("stockEntrees")?.length;
      // if (ids == null) {
      //   ids = 0;
      // }
      // console.log(ids + 1);
      // this.entreeProduit.id = ids + 1;
      
      const newEntree: Entree = this.entreeProduit.value;
      if (this.isedit && this.selectedEntree) {
        Object.assign(this.selectedEntree, newEntree);
      } else {
        

      }
      this.entreeProduit.reset();
      this.selectedEntree = undefined;
      this.isedit = false;
      const stok: Stock = {
        id: 0,
        date: new Date(),
        description: newEntree.description,
        produit: newEntree.produit,
        quantite: newEntree.quantite,
        prix_unitaire: newEntree.prix_unitaire,
        montant: newEntree.montant
      }
      

      

      const saveEntree: Entree ={
        date: new Date(),
        description: newEntree.description,
        produit: newEntree.produit,
        fournisseur: newEntree.fournisseur,
        quantite: newEntree.quantite,
        prix_unitaire: newEntree.prix_unitaire,
        montant: newEntree.montant
      }
      this.entreeService.saveDataEntree(saveEntree);
      //this.entrees.push(newEntree);
      this.stockService.saveData(stok);
      //sessionStorage.setItem("entreeDonner", JSON.stringify(this.entrees));


    }
  }

  deleteSortie(index: number) {
    this.entrees.splice(index, 1);
  }

  addmodel(entrees?: Entree) {
    if (entrees) {
      this.selectedEntree = { ...entrees };
      this.isedit = true;
    } else {
      this.selectedEntree = undefined;
      this.isedit = false;
    }
  }


}
