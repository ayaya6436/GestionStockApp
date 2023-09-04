import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DetailProduit, Produit } from './produit.model';
import { ProduitService } from '../produit.service';
import { GeneratorIdService } from '../generator-id.service';
import { SortieService } from '../sortie.service';
import { EntreeService } from '../entree.service';
import { StockService } from '../stock.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  // quantiteControl = new FormControl('', [Validators.required, Validators.name]);



  ajoutProduit: FormGroup;
  produitTab: Produit[] = [];
  detailTabe: DetailProduit[] = []; //
  selectedProduitDetails: Produit | undefined;
  selectedProduit: Produit | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  vueProduit: any[] = [];
  submitted = false;


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
    private toastr: ToastrService


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
    this.submitted = true;

    if (this.ajoutProduit.invalid) {

      this.toastr.error('Veuillez remplir tous les champs', 'Erreur', { timeOut: 5000 });
      return

    } else {
      console.log("je dedans")
      const produitExists = this.produitService.getProduitNom(this.ajoutProduit.value.nom);

      console.log(produitExists + "je trouver produit")
      if (produitExists == null || produitExists == undefined) {

        const newProduit = this.ajoutProduit.value;
        // console.log(newProduit.nom + "donnees trouver");
        if (!this.isedit) {
          newProduit.id = this.generatorIdService.generateNewId(this.ajoutProduit.value.id);
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
        // this.ajoutProduit.reset();
        this.produitService.saveDataProuit(saveProduit);
        console.log(saveProduit + ": donnees trouver avec succees");

        this.toastr.success('Entree effectuee avec succès !', 'Succès', { timeOut: 5000 });

        } 
      }
      // Réinitialiser le formulaire et supprimer les erreurs
      this.ajoutProduit.reset();
      Object.keys(this.ajoutProduit.controls).forEach(controlName => {
        this.ajoutProduit.get(controlName)?.setErrors(null);
      });

      // Réinitialiser le formulaire et marquer comme non soumis
      // this.submitted = false;
    }

    addmodel(ajoutProduit ?: Produit) {

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

      //let entre = this.entreeService.getEntreByProduit(ajoutProduit.id);
      let entres = this.entreeService.getAllEntreByProduit(ajoutProduit.nom);
      let sortie = this.sortieService.getAllSortieByProduit(ajoutProduit.nom);
      let stocks = this.stockService.getAllStockByProduit(ajoutProduit.nom);
      entres.forEach(entre => {
        this.vueProduit.push(
          {
            date: ajoutProduit.date,
            nom: ajoutProduit.nom,

            // detail entree par produit
            entreeQuantite: entre?.quantite,
            entreePrix: entre?.prix_unitaire,
            entreMontant: entre?.montant,

            // detail sortie par produit
            sortieQuantite: null,
            sortiePrix: null,
            sortieMontant: null,

            // detail entree par produit
            stockQuantite: null,
            stockPrix: null,
            stockMontant: null,
          }
        );
      });
      let i = 0;
      stocks.forEach(stock => {
        this.vueProduit[i].stockQuantite = stock.quantite;
        this.vueProduit[i].stockPrix = stock.prix_unitaire;
        this.vueProduit[i].stockMontant = stock.montant;
        i++;
      });

      let j =0;
      sortie.forEach(sortie => {
        this.vueProduit[j].sortieQuantite = sortie.quantite;
        this.vueProduit[j].sortiePrix = sortie.prix_unitaire;
        this.vueProduit[j].sortieMontant = sortie.montant;
        j++;
      })

    }

    deleteProduit(index: number) {
      this.produitTab.splice(index, 1);
      this.toastr.success('Produit Supprimer avec succès !', 'Warning', { timeOut: 5000 });
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
