import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from './fournisseur.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
fournisseurForm:FormGroup|any;
fournisseurs: Fournisseur[] = [];
selectedFournisseur: Fournisseur | undefined;
currentDate= new Date();
isedit: boolean=false;
ngOnInit():void{
}

constructor(private fb: FormBuilder,private toastr: ToastrService) {
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
      this.toastr.success('Fournisseur mis à jour avec succès !', 'Succès');
    } else {
      this.fournisseurs.push(fournisseur);
      this.toastr.success('Fournisseur ajouté avec succès !', 'Succès');
    }
    this.fournisseurForm.reset();
    this.selectedFournisseur = undefined;
    this.isedit = false;
  } else {
    this.toastr.error('Veuillez remplir tous les champs correctement.', 'Erreur');
  }
}

deleteFournisseur(index: number) {
  this.fournisseurs.splice(index, 1);
  this.toastr.success('Fournisseur Supprimer avec succès !', 'Warning');
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

imprimerListe() {
  window.print();
}



}