import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from './produit.model';
import { ProduitService } from '../produit.service';
import { GeneratorIdService } from '../generator-id.service';
import { SortieService } from '../sortie.service';
import { EntreeService } from '../entree.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  ajoutProduit: FormGroup;
  produitTab: Produit[] = [];
  selectedProduitDetails: Produit | undefined;
  selectedProduit: Produit | undefined;
  currentDate = new Date();
  isedit: boolean = false;


  ngOnInit(): void {
    this.produitTab = this.produitService.getDataProduit();
  }
  constructor(
    private fb: FormBuilder, 
    private produitService: ProduitService, 
    private generatorIdService: GeneratorIdService,
    private sortieService: SortieService,
    private entreeService: EntreeService,
    private stockService: StockService,
    
    ) {

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
      const produitExists = this.produitService.getProduitNom(this.ajoutProduit.value.nom);

      console.log(produitExists + "je trouver produit")
      if (produitExists == null || produitExists == undefined) {
        // const sortiMontant = this.ajoutProduit.value.montant;
        // const quantiteEntrant = this.ajoutProduit.value.quantite;
        // const montQuantity = produitExists.quantite + quantiteEntrant;

        // console.log(montQuantity + "quantite modifier");
        // const monontantsortieStock = stockExists.montant - sortiMontant;
        // this.stockService.updateStock(stockExists.id, monontantsortieStock);
        // this.produitService.updateQuantite(produitExists.nom, montQuantity);

        // console.log(monontantsortieStock + " stock updated");
        const newProduit = this.ajoutProduit.value;
        // console.log(newProduit.nom + "donnees trouver");
        if (!this.isedit) {
          newProduit.id = this.generatorIdService.generateNewId();
          console.log(newProduit.id + " id trouver");
        }

        const saveProduit: Produit = {
          date: new Date(),
          id: newProduit.id,
          nom: newProduit.nom,
          description: newProduit.description,
          quantite: newProduit.quantite

        }
        console.log(saveProduit + ": donnees trouver");
        this.produitService.saveDataProuit(saveProduit);
        console.log(saveProduit + ": donnees trouver avec succees");
        // this.ajoutProduit.reset();

      }
    }
  }
  addmodel(ajoutProduit?: Produit) {

    if (ajoutProduit) {
      this.selectedProduit = { ...ajoutProduit };
      this.isedit = true;
    } else {
      this.selectedProduit = undefined;
      this.isedit = false;
    }
  }

  //formulaire de detail de produit
  viewDetails(ajoutProduit: Produit) {
    // this.selectedProduitDetails = ajoutProduit;
    // this.produitService.getDataStock();
    // this.produitService.getDataSortie();
    // this.produitService.getDataEntree();
    
    const entrees = this.entreeService.getProduitEntree(ajoutProduit.nom);
    const sorties = this.sortieService.getSortieProduit(ajoutProduit.nom);
    const stock = this.stockService.getStockProduit(ajoutProduit.nom);
    
    const detailData ={ entrees, sorties, stock };
  }

  deleteProduit(index: number) {
    this.produitTab.splice(index, 1);
    // this.toastr.success('Fournisseur Supprimer avec succès !', 'Warning');
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
