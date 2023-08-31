import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-entree',
  templateUrl: './entree.component.html',
  styleUrls: ['./entree.component.css']
})
export class EntreeComponent implements OnInit {
  entreeProduit: FormGroup ;
  entrees: Entree[] = [];
  selectedEntree: Entree | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  toastr: any;
 


  ngOnInit(): void {
    this.entrees = this.entreeService.getDataEntree();
  }

  constructor(private fb: FormBuilder, private stockService: StockService, private entreeService: EntreeService, private produitService: ProduitService, private generatorIdService: GeneratorIdService) {

    this.entreeProduit = this.fb.group({
      id: [0, Validators.required],
      date: [new Date(), Validators.required],
      quantite: [0, Validators.required],
      prix_unitaire: [0, Validators.required],
      montant: [0, Validators.required],
      produit: ["", Validators.required],
      fournisseur: ['', Validators.required],
      description: ['', Validators.required],

    });
  }
  submit() {
    if (this.entreeProduit.valid) {
      const produitExist = this.produitService.getProduitNom(this.entreeProduit.value.produit);

      console.log(produitExist + "je trouver stock")
      if (produitExist != null) {
        const entreeMontant = this.entreeProduit.value.montant;
        const quantiteEntree = this.entreeProduit.value.quantite;
        const montQuantity = produitExist.quantite + quantiteEntree;

        const quantiteEntrant = this.entreeProduit.value.quantite;
        const prixUnitaire = this.entreeProduit.value.prix_unitaire;
        const montantEntrant = quantiteEntrant * prixUnitaire;
        
         console.log( montQuantity+ ": quantite modifier");
        //  const monontantEntree = produitExist.quantite - entreeMontant;
        //  this.stockService.updateStock(produitExist.nom, monontantEntree);
        this.produitService.updateQuantite(produitExist.nom, montQuantity);
       
         this.entreeService.updateMontant(produitExist.id ,montantEntrant);

         console.log(montantEntrant + " stock updated");

      
      const newEntree: Entree = this.entreeProduit.value;
      if(!this.isedit){
       
        newEntree.id = this.generatorIdService.generateNewId();
      }
      console.log(newEntree.id,"id trouver")
      if (this.isedit && this.selectedEntree) {
        Object.assign(this.selectedEntree, newEntree);
       
      } else {
        

      }
      
      this.selectedEntree = undefined;
      this.isedit = false;
      const stok: Stock = {
        id: 0,
        date: new Date(),
        description: newEntree.description,
        produit: newEntree.produit,
        quantite: newEntree.quantite,
        prix_unitaire: newEntree.prix_unitaire,
        montant: newEntree.montant
      }

      const saveEntree: Entree ={
        id: 0,
        date: new Date(),
        description: newEntree.description,
        produit: newEntree.produit,
        fournisseur: newEntree.fournisseur,
        quantite: newEntree.quantite,
        prix_unitaire: newEntree.prix_unitaire,
        montant: newEntree.montant
      }
      
      //verification et comparaison
      // const produitEntrant = this.entreeService.getProduitEntree(saveEntree.produit );
      // const idProduit = this.produitService.getProduitId()
      this.entreeService.saveDataEntree(saveEntree);
      
      //this.entrees.push(newEntree);
      this.stockService.saveData(stok);
      //sessionStorage.setItem("entreeDonner", JSON.stringify(this.entrees));
      }  
    }else
    console.log("error")
    // this.toastr.success('Fournisseur mis à jour avec succès !', 'Succès');

  }

  deleteSortie(index: number) {
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

