import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

type SortieProduit = {
  date: Date;
  description: String;
  produit: String;
  quantite: number;
  prix_unitaire: number;
  montant: number;
};

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent {

  constructor(private dialog: MatDialog) {}

// sortie: sortieProduit = [
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

openPopup(){
  const dialogRef = this.dialog.open(PopupComponent);
  
  dialogRef.afterClosed().subscribe(formData => {
    if (formData) {
      this.handleFormData(formData);
    }
  });
}

  sortie: SortieProduit[] = [];


  handleFormData(formData: SortieProduit) {
    let newSortie: SortieProduit = {
    date: formData.date as Date,
      quantite: formData.quantite as number,
      prix_unitaire: formData.prix_unitaire as number,
      montant: formData.montant as number,
      produit: formData.produit as String,
      description: formData.description as String
    };

    this.sortie.push(newSortie);
    console.log(newSortie.montant);
    //this.sortieProduit.reset();

  }
 

}
  
  
////////////////////////////////
// clicSurBouton(){
//   const accederFormulaire = this.sortieProduit;
//   alert("Vous venez de cliquer sur le bouton");
// }

// clicFiltrer(){

// // }
// @ViewChild('myDialog') myDialog: ElementRef;

