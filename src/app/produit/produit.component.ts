import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from './produit.model';
import { ProduitService } from '../produit.service';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  ajoutProduit: FormGroup;
  produitTab: Produit[] = [];
  selectedProduit: Produit | undefined;
  currentDate = new Date();
  isedit: boolean = false;

  ngOnInit(): void {
    this.produitTab = this.produitService.getDataProduit();
  }
  constructor(private fb: FormBuilder, private produitService: ProduitService) {
    this.ajoutProduit = this.fb.group({
      date: [new Date(), Validators.required],
      quantite: [0, Validators.required],
      id: [0, Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
    });
    
  }


  submit() {
    if (this.ajoutProduit.valid) {
      // let ids = sessionStorage.getItem("stockEntrees")?.length;
      // if (ids == null) {
      //   ids = 0;
      // }
      // console.log(ids + 1);
      // this.entreeProduit.id = ids + 1;

      const newProduit: Produit = this.ajoutProduit.value;
      if (this.isedit && this.ajoutProduit) {
        Object.assign(this.ajoutProduit, newProduit);
      } else {
       // this.produitService.saveDataProuit(newProduit);
      }
      this.ajoutProduit.reset();
      //this.ajoutProduit = undefined;
      this.isedit = false;

      const saveProduit: Produit = {
        date: new Date(),
        id: newProduit.id,
        nom: newProduit.nom,
        description: newProduit.description,
        quantite: newProduit.quantite

      }
      
     this.produitService.saveDataProuit(saveProduit);
     
    }
    console.log( "donnees trouvees");
  }
  addmodel(ajoutProduit?: Produit) {
    var form = document.getElementById('formPopup');
    if (form) {
      form.style.display = "block";
    }
    
    if (ajoutProduit) {
      this.selectedProduit = { ...ajoutProduit };
      this.isedit = true;
    } else {
      this.selectedProduit = undefined;
      this.isedit = false;
    }
  }

  //formulaire de detail de produit
  
}
