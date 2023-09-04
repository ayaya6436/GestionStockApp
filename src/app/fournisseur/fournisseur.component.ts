import { FournisseurService } from './../fournisseur.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from './fournisseur.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css'],
})
export class FournisseurComponent implements OnInit {
  fournisseurForm: FormGroup | any;
  fournisseurs: Fournisseur[] = [];
  fournisseursCopie: Fournisseur[] = []; // Copie des données d'origine
  selectedFournisseur: Fournisseur | undefined;
  selectedFournisseurDetails: Fournisseur | undefined;
  currentDate = new Date();
  isedit: boolean = false;

  //datatable
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
    };
    this.fournisseurs = this.fournisseurService.getFournisseur();

  
    this.fournisseursCopie = [...this.fournisseurs];
  }

  constructor(private fb: FormBuilder, private toastr: ToastrService, private fournisseurService: FournisseurService) {
    this.fournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.email],
      telephone: [''],
      recherche: [''], // Champ de recherche
    });
  }

  submit() {

    if (this.fournisseurForm.valid) {
      const newFournisseur = this.fournisseurForm.value;
      const saveFournisseur : Fournisseur ={
        nom: newFournisseur.nom,
        prenom: newFournisseur.prenom,
        email: newFournisseur.email,
        telephone: newFournisseur.telephone

      }
      const fournisseur: Fournisseur = this.fournisseurForm.value;
      if (this.isedit && this.selectedFournisseur) {
        Object.assign(this.selectedFournisseur, fournisseur);
        this.toastr.success('Fournisseur mis à jour avec succès !', 'Succès');
      } else {
        this.fournisseurService.saveFournisseur(saveFournisseur)
        // this.fournisseurs.push(fournisseur);
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

  viewDetails(fournisseur: Fournisseur) {
    this.selectedFournisseurDetails = fournisseur;
  }

  // Fonction de recherche
  search() {
    const recherche = this.fournisseurForm.value.recherche.toLowerCase();
    this.fournisseurs = this.fournisseursCopie.filter((fournisseur: Fournisseur) => {
      return (
        fournisseur.nom.toLowerCase().includes(recherche) ||
        fournisseur.prenom.toLowerCase().includes(recherche) ||
        fournisseur.email.toLowerCase().includes(recherche) ||
        fournisseur.telephone.includes(recherche)
      );
    });
  }

  // Réinitialisez la recherche pour afficher toutes les données
  resetSearch() {
    this.fournisseurs = [...this.fournisseursCopie];
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
