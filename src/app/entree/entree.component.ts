import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Entree } from './entree.model';
import { StockService } from '../stock.service';
import { Stock } from '../stock/stock.model';
import { EntreeService } from '../entree.service';
import { ProduitService } from '../produit.service';
import { ProduitComponent } from '../produit/produit.component';
import { Produit } from '../produit/produit.model';
import { ToastrService } from 'ngx-toastr';
import { GeneratorIdService } from '../generator-id.service';
import { Fournisseur } from '../fournisseur/fournisseur.model';
import { FournisseurService } from '../fournisseur.service';

@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrls: ['./entree.component.css']
})
export class EntreeComponent implements OnInit {
  entreeProduit: FormGroup;
  lastId: number = 0;
  entrees: Entree[] = [];
  fournisseurs: Fournisseur[] = [];
  selectedEntree: Entree | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  //toastr: any;
  produits: Produit[] = [];
  stockTable: Stock | undefined;
  submitted = false;

  // afficherOption = false;

  ngOnInit(): void {
    this.entrees = this.entreeService.getDataEntree();
    this.produits = this.produitService.getDataProduit();
    this.fournisseurs = this.fournisseurService.getFournisseur();

  }

  constructor(
    private fb: FormBuilder, 
    private stockService: StockService, 
    private entreeService: EntreeService, 
    private produitService: ProduitService, 
    private generatorIdService: GeneratorIdService,
    private toastr: ToastrService,
    private fournisseurService: FournisseurService
    )

    {

    this.entreeProduit = this.fb.group({
      id: ['',],
      date: [new Date(), Validators.required],
      quantite: ['', Validators.required],
      prix_unitaire: ['', Validators.required],
      produit: ["", Validators.required],
      fournisseur: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  submit() {
    this.submitted = true;
    console.log(this.entreeProduit.value)

    if (this.entreeProduit.invalid) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur',{timeOut: 5000});
      return;

    }else{
      const quantiteEntrant = this.entreeProduit.value.quantite;
      const prixUnitaire = this.entreeProduit.value.prix_unitaire;
      const montant = quantiteEntrant * prixUnitaire;

      const produitExist = this.produitService.getProduitId(this.entreeProduit.value.produit);
      console.log(this.entreeProduit.value.produit + ":" + "je trouver un produit");

      if (produitExist != null) {
        console.log("je suis dedans");
        this.entreeProduit.value.id = this.generatorIdService.generateNewId(this.entreeProduit.value.id);
        console.log(this.entreeProduit.value.id, "id entree trouver")
        const newEntree: Entree = this.entreeProduit.value;

        const saveEntree: Entree = {
          id: newEntree.id,
          date: new Date(this.currentDate),
          description: newEntree.description,
          produit: newEntree.produit,
          fournisseur: newEntree.fournisseur,
          quantite: newEntree.quantite,
          prix_unitaire: newEntree.prix_unitaire,
          montant: montant as unknown as number
        }
        this.entreeService.saveDataEntree(saveEntree);

        this.entreeService.updateEntreeNewMontant(produitExist.nom, montant);

        let stock = this.stockService.getStockByIdProduit(newEntree.produit);

        if (stock != null || stock != undefined) {
          const quantite = stock.quantite + newEntree.quantite;
          const montant = quantite * newEntree.prix_unitaire;
          stock.quantite = quantite;
          stock.montant = montant;
          this.stockService.updateOldStock(stock);
        } else {
          const newStock: Stock = {
            id: this.generatorIdService.generateNewId(newEntree.id),
            date: new Date(this.currentDate),
            description: newEntree.description,
            produit: newEntree.produit,
            quantite: newEntree.quantite,
            prix_unitaire: newEntree.prix_unitaire,
            montant: montant as unknown as number,
            fournisseur: newEntree.fournisseur
          }
          this.stockService.saveData(newStock);
        }

        this.produitService.updateQuantiteProduit(saveEntree.produit, saveEntree.quantite);

        console.log(montant + ":" + "montant nouveau entree trouver");
        this.toastr.success('Produit ajouté avec succès !', 'Succès' ,{timeOut: 5000});
        
        // Réinitialisation du formulaire après avoir soumis avec succès
        
      }
      
    }
    console.log("je passe");

    this.entreeProduit.reset();
Object.keys(this.entreeProduit.controls).forEach(controlName => {
 this.entreeProduit.get(controlName)?.setErrors(null);
});

// Réinitialiser le formulaire et marquer comme non soumis
this.submitted = false;


  }

  deleteEntree(index: number) {
    this.entrees.splice(index, 1);
  }

  addmodel(entrees?: Entree) {
    if (entrees) {
      this.selectedEntree = { ...entrees };
      this.isedit = true;
    } else {
      this.selectedEntree = undefined;
      this.isedit = false;
    }
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