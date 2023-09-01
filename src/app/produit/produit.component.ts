import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from './produit.model';
import { ProduitService } from '../produit.service';
import { GeneratorIdService } from '../generator-id.service';
import { SortieService } from '../sortie.service';
import { EntreeService } from '../entree.service';
import { StockService } from '../stock.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  ajoutProduit: FormGroup;
  produitTab: Produit[] = [];
  selectedProduit: Produit | undefined;
  currentDate = new Date();
  isedit: boolean = false;

  
  dtoptions: DataTables.Settings={}
  dtTrigger:Subject<any> = new Subject<any>();

  ngOnInit():void{
    this.produitTab = this.produitService.getDataProduit();
    this.dtoptions={
      pagingType:'full_numbers',
      searching:true,
      lengthChange:false
      
     
    }
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
      // let ids = sessionStorage.getItem("stockEntrees")?.length;
      // if (ids == null) {
      //   ids = 0;
      // }
      // console.log(ids + 1);
      // this.entreeProduit.id = ids + 1;

      console.log(produitExists + "je trouver produit")
      if (produitExists == null || produitExists == undefined) {
        
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
        
        this.dtTrigger.next(null);
      }
      
     this.produitService.saveDataProuit(saveProduit);
     
    }
    console.log( "donnees trouvees");
  }
  addmodel(ajoutProduit?: Produit) {
    var form = document.getElementById('formPopup');
    if (form) {
      form.style.display = "block";
    }
    
    if (ajoutProduit) {
      this.selectedProduit = { ...ajoutProduit };
      this.isedit = true;
    } else {
      this.selectedProduit = undefined;
      this.isedit = false;
    }
  }

  //formulaire de detail de produit
  
}
