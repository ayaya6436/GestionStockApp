import { Injectable } from '@angular/core';
import { Fournisseur } from './fournisseur/fournisseur.model';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

 private fournisseurTab: Fournisseur[] = [];

  constructor() { }

  addFournisseur(fournisseur: Fournisseur) {
    this.fournisseurTab.push(fournisseur);
  }
  getFournisseur() {
    return this.fournisseurTab;
  }
  deleteFournisseur(fournisseur: Fournisseur) {
    this.fournisseurTab = this.fournisseurTab.filter(f => f!== fournisseur);
  }
  updateFournisseur(fournisseur: Fournisseur) {
    const index = this.fournisseurTab.indexOf(fournisseur);
    this.fournisseurTab[index] = fournisseur;
  }

  getFournisseurById(mail: String) {
     this.fournisseurTab.find(f => f.email == mail);
  }

  getFournisseurByNom(nom: String) {
     this.fournisseurTab.find(f => f.nom == nom);
  }

  saveFournisseur(data: Fournisseur){
     return this.fournisseurTab.push(data);
  }

}
