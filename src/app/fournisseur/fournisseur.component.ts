import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from './fournisseur.model';
import { ToastrService } from 'ngx-toastr';
import { FournisseurService } from '../fournisseur.service';


@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
fournisseurForm:FormGroup|any;
fournisseurs: Fournisseur[] = [];
selectedFournisseur: Fournisseur | undefined;
selectedFournisseurDetails: Fournisseur | undefined;
currentDate= new Date();
isedit: boolean=false;

// dtoptions: DataTables.Settings={}
ngOnInit():void{
 this.fournisseurs = this.fournisseurService.getFournisseur();
}

constructor(private fb: FormBuilder,private toastr: ToastrService ,private fournisseurService: FournisseurService) {
  this.fournisseurForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', Validators.email],
    telephone: ['']
  });
}
submit() {
  if (this.fournisseurForm.valid) {
    const newFournisseur = this.fournisseurForm.value;
    const saveFournisseurs: Fournisseur = {
      nom: newFournisseur.nom,
      prenom: newFournisseur.prenom,
      email: newFournisseur.email,
      telephone: newFournisseur.telephone
    }
    // const fournisseur: Fournisseur = this.fournisseurForm.value;

    if (this.isedit && this.selectedFournisseur) {
      Object.assign(this.selectedFournisseur, saveFournisseurs);
      this.toastr.success('Fournisseur mis à jour avec succès !', 'Succès');
    } else {

      this.toastr.success('Fournisseur ajouté avec succès !', 'Succès');
    }
    this.fournisseurService.saveFournisseur(saveFournisseurs);
    // this.fournisseurForm.reset();
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

viewDetails(fournisseur: Fournisseur) {
  this.selectedFournisseurDetails = fournisseur;
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