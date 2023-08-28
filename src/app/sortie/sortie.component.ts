import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { Sortie } from './sortie.model';
import { StockService } from '../stock.service';
import { SortieService } from '../sortie.service';


@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  sortieProduit: FormGroup | any;
  sorties: Sortie[] = [];
  selectedSortie: Sortie | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  ngOnInit() {
    this.sortieService.getDataSortie();
  }

  constructor(private fb: FormBuilder, private stockService: StockService, private sortieService: SortieService) {
    // stockService = new StockService;
    // this.stockService.stocks.findIndex(stock => stock.id === this.sortieService.sortieProduitService.findIndex(sortieProduitService=> sortieProduitService.number_stock))

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
  //   elementStock(){

  // }
  submit() {
    console.log("dfghjkl");
    if (this.sortieProduit.valid) {
      const numberSockValue = this.sortieService.getIdSortie();
      if (numberSockValue !== undefined) {
        const stockExist = this.stockService.getStockById();
        if (stockExist != null) {
          const montantStock = this.stockService.getStockById();
          let montant = montantStock?.montant;
          // if(montant != null){
          const sortieMontant = this.sortieService.getIdSortie();
          let monontantsortie = sortieMontant?.montant;
          // if(sortieMontant != null){

          const soustractionMontant = montant! - monontantsortie!;
          this.stockService.updateStock(soustractionMontant);
        }


      }


      //if (this.sortieProduit.valid) {
        const newSortie: Sortie = this.sortieProduit.value;
        if (this.isedit && this.selectedSortie) {
          Object.assign(this.selectedSortie, newSortie);
          console.log("je suis dans element stock");
        } else {
          this.sorties.push(newSortie);
        }
        console.log(newSortie);
        this.sortieService.saveDataSortie(newSortie);
        this.sortieProduit.reset();
        this.selectedSortie = undefined;
        this.isedit = false;
      //}
      
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



  //   constructor(private dialog: MatDialog) {}

  // sortie: popupForm = [
  //   { 
  //     date : new Date("2023-08-10"),
  //     description: "Description",
  //     produit: 
  //     quantite: number,
  //     prix_unitaire: number,
  //     montant: Number
  //   }
  // ];

  // sortieProduit = new FormGroup({
  //   date: new FormControl(new Date(),Validators.required),
  //   description: new FormControl("",Validators.required ),
  //   produit: new FormControl("",Validators.required),
  //   quantite: new FormControl(0,Validators.required),
  //   prix_unitaire: new FormControl(0,Validators.required),
  //   montant: new FormControl(0,Validators.required),


  // });

  // openPopup(){
  //   const dialogRef = this.dialog.open(PopupComponent);

  //   dialogRef.afterClosed().subscribe(formData => {
  //     if (formData) {
  //       this.handleFormData(formData);
  //     }
  //   });
  // }

  //   sortie: SortieProduit[] = [];


  //   handleFormData(formData: SortieProduit) {
  //     let newSortie: SortieProduit = {
  //     date: formData.date as Date,
  //       quantite: formData.quantite as number,
  //       prix_unitaire: formData.prix_unitaire as number,
  //       montant: formData.montant as number,
  //       produit: formData.produit as String,
  //       description: formData.description as String
  //     };

  //     this.sortie.push(newSortie);
  //     console.log(newSortie.montant);
  //     //this.sortieProduit.reset();

  //   }


}


////////////////////////////////
// clicSurBouton(){
//   const accederFormulaire = this.sortieProduit;
//   alert("Vous venez de cliquer sur le bouton");
// }

// clicFiltrer(){

// // }
// @ViewChild('myDialog') myDialog: ElementRef;

