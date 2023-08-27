import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from './fournisseur.model';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
fournisseurForm:FormGroup|any;
fournisseurs: Fournisseur[] = [];
selectedFournisseur: Fournisseur | undefined;
isedit: boolean=false;
ngOnInit():void{
}

constructor(private fb: FormBuilder) {
  this.fournisseurForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', Validators.email],
    telephone: ['']
  });
}
submit() {
  if (this.fournisseurForm.valid) {
    const fournisseur: Fournisseur = this.fournisseurForm.value;
    if (this.isedit && this.selectedFournisseur) {
      Object.assign(this.selectedFournisseur, fournisseur);
    } else {
      this.fournisseurs.push(fournisseur);
    }
    this.fournisseurForm.reset();
    this.selectedFournisseur = undefined;
    this.isedit = false;
  }
}

deleteFournisseur(index: number) {
  this.fournisseurs.splice(index, 1);
}

addmodel(fournisseur?: Fournisseur) {
  if (fournisseur) {
    this.selectedFournisseur = { ...fournisseur };
    this.isedit = true;
  } else {
    this.selectedFournisseur = undefined;
    this.isedit = false;
  }
}

}
