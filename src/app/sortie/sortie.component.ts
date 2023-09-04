import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { Sortie } from './sortie.model';
import { StockService } from '../stock.service';
import { SortieService } from '../sortie.service';
import { GeneratorIdService } from '../generator-id.service';
import { ProduitService } from '../produit.service';
import { Produit } from '../produit/produit.model';
import { ToastrService } from 'ngx-toastr';
import { Stock } from '../stock/stock.model';


@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  sortieProduit: FormGroup;
  lastId: number = 0;
  sorties: Sortie[] = [];
  stockTab: Stock[] = [];
  produitTabe: Produit[] = [];
  selectedSortie: Sortie | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  submitted = false;

  ngOnInit() {
    this.sorties = this.sortieService.getDataSortie();
    this.stockTab = this.stockService.getData();
    this.produitTabe = this.produitService.getDataProduit();
  }

  constructor(
    private fb: FormBuilder, 
    private stockService: StockService, 
    private sortieService: SortieService, 
    private generatorIdService: GeneratorIdService, 
    private produitService: ProduitService,
    private toastr: ToastrService

    ) 
    {
    this.sortieProduit = this.fb.group({
      date: [new Date(), Validators.required],
      quantite: ['', Validators.required],
      number_stock: ['', Validators.required],
      prix_unitaire: ['', Validators.required],
      montant: ['',],
      produit: ['', Validators.required],
      client: ['', Validators.required],
      description: ['', Validators.required],

    });

  }
 

  submit() {
    this.submitted = true;
    console.log(this.sortieProduit.value);
    if (this.sortieProduit.invalid) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur', { timeOut: 5000 });

    }else{
      const quantiteSortie = this.sortieProduit.value.quantite;
      const prixUnitaire  = this.sortieProduit.value.prix_unitaire;
      const stockExists = this.stockService.getStockByProduitNom(this.sortieProduit.value.produit);

      console.log(stockExists + "je trouver stock")
      if (stockExists != null || stockExists!=undefined) {
        const stockQuantite = stockExists.quantite;
        if (stockQuantite < quantiteSortie){
          this.toastr.error('votre stock est insufusant!', 'Erreur', { timeOut: 5000 });
          return;
        }else{
          
       const newQuantiStockExist = stockExists.quantite - quantiteSortie;
        const  montantSortie = quantiteSortie * prixUnitaire;
        console.log(montantSortie + " "+ "montant sortie trouver")
        const montExistUpdate = newQuantiStockExist * stockExists.prix_unitaire;

        const newSortie: Sortie = this.sortieProduit.value;
        
        const saveSortie: Sortie ={
          id: newSortie.id,
          date: newSortie.date,
          number_stock: newSortie.number_stock,
          description: newSortie.description,
          produit: newSortie.produit,
          quantite: newSortie.quantite,
          prix_unitaire: newSortie.prix_unitaire,
          montant: newSortie.prix_unitaire*newSortie.quantite,
          client: newSortie.client
        }
        this.sortieService.saveDataSortie(saveSortie)
        
       
        this.stockService.updateQuantite(stockExists.produit, newQuantiStockExist);
        this.stockService.updateStock(stockExists.produit, montExistUpdate );
        //this.sortieService.updateSortie(stockExists.produit, montantSortie);
        this.toastr.success('Sortie effectuer avec succès !', 'Succès' ,{timeOut: 5000});

        console.log(montantSortie + " stock updated");
      }

      }

    }
    // this.sortieProduit.reset();
    // Object.keys(this.sortieProduit.controls).forEach(controlName => {
    //   this.sortieProduit.get(controlName)?.setErrors(null);
    // });
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
