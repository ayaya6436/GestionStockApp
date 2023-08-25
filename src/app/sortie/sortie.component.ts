import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent {
  sortieProduit = new FormGroup({
    date: new FormControl("",Validators.required),
    quantite: new FormControl("",Validators.required),
    prix_unitaire: new FormControl("",Validators.required),
  montant: new FormControl("",Validators.required),
  produit: new FormControl("",Validators.required),
  description: new FormControl("",Validators.required )
  });
 
  

  onSubmit = () => {
    console.log(this.sortieProduit.value);
  }

}
