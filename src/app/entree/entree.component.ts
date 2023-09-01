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
  entreeProduit: FormGroup;
  entrees: Entree[] = [];
  selectedEntree: Entree | undefined;
  currentDate = new Date();
  isedit: boolean = false;
  //toastr: any;
  produits: Produit[] = [];
  stockTable: Stock | undefined;



  ngOnInit(): void {
    this.entrees = this.entreeService.getDataEntree();
    this.produits = this.produitService.getDataProduit();

  }

  constructor(private fb: FormBuilder, private stockService: StockService, private entreeService: EntreeService, private produitService: ProduitService, private generatorIdService: GeneratorIdService) {

    this.entreeProduit = this.fb.group({
      id: [0, Validators.required],
      date: [new Date(), Validators.required],
      quantite: [0, Validators.required],
      prix_unitaire: [0, Validators.required],
      produit: ["", Validators.required],
      fournisseur: ['', Validators.required],
      description: ['', Validators.required],

    });
  }
  submit() {
    
    if (this.entreeProduit.valid) {
      const quantiteEntrant = this.entreeProduit.value.quantite;
      const prixUnitaire = this.entreeProduit.value.prix_unitaire;
      const montant = quantiteEntrant * prixUnitaire;

      const produitExist = this.produitService.getProduitId(this.entreeProduit.value.produit);
      console.log(this.entreeProduit.value.produit+ ":"+"je trouver un produit");

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
        
        this.entreeService.updateEntreeNewMontant(produitExist.id, montant);

        let stock = this.stockService.getStockByIdProduit(newEntree.produit);

        if(stock != null || stock != undefined) {
          const quantite = stock.quantite + newEntree.quantite;
          const montant = quantite * newEntree.prix_unitaire;
          stock.quantite = quantite;
          stock.montant = montant;
          this.stockService.updateOldStock(stock);
        }else{
          const newStock : Stock = {
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

        this.produitService.updateQuantiteProduit(saveEntree.produit, saveEntree.quantite)


        
        console.log(montant + ":"+"montant nouveau entree trouver");
        

        
        // this.stockTable.find= this.generatorIdService.generateNewId();
        
        // const StockExist = this.stockService.getStockById(this.entreeProduit.value.produit);
        // if (StockExist != null) {

        //   const newQuantiStockExist = StockExist.quantite + this.entreeProduit.value.quantite;
        //   const montStockExist =  StockExist.montant;

        //   const newMontantstock = StockExist.quantite * StockExist.prix_unitaire;
        //   const updatedStockMontant = newMontantstock + montStockExist;

        //   const stok: Stock = {
        //     id: newEntree.id,
        //     date: new Date(this.currentDate),
        //     description: newEntree.description,
        //     produit: newEntree.produit,
        //     quantite: newEntree.quantite,
        //     prix_unitaire: newEntree.prix_unitaire,
        //     montant: newEntree.montant
        //   }
          
        //   // stok.id = this.generatorIdService.generateNewId();
        //   // console.log(stok.id -2, "id stock trouver");

        //   this.stockService.saveData(stok);
        //   console.log(stok + ": " + "stock montan trouver");
        //   this.stockService.newMontant(StockExist.id, updatedStockMontant);
        //   console.log(updatedStockMontant + "montant stock trouver");
        //   this.stockService.getQuantity(StockExist.produit, newQuantiStockExist);
        //   console.log(newQuantiStockExist + "quantite stock trouver");
        // }else{
        //   const newStock: Stock = {
        //     id: newEntree.id,
        //     date: new Date(),
        //     description: newEntree.description,
        //     produit: newEntree.produit,
        //     quantite: newEntree.quantite,
        //     prix_unitaire: newEntree.prix_unitaire,
        //     montant: newEntree.montant
        //   }
        //   this.stockService.saveData(newStock);
        // //   let stocId = this.stockTable!.id;
        // // if (stocId===null || stocId===undefined){

        // //   stocId = this.generatorIdService.generateNewId();
        // // console.log(stocId+ "id stock trouver");
        // // }
        //   this.stockService.updateEntreeNewMontant(newStock.id, montant);
        //   console.log("montant updated"+":"+montant);
        //   //this.stockService.getQuantity(newStock.produit, newStock.quantite);
        //   console.log(newStock.quantite + "quantite stock trouver");
        }
      }
        console.log("je passe");
        
        //sessionStorage.setItem("entreeDonner", JSON.stringify(this.entrees));
      

    // } else {
    //   console.log("error")
    //   // this.toastr.success('Fournisseur mis à jour avec succès !', 'Succès');

    // }
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