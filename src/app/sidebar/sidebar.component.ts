import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @Input() sideBarStatus: boolean = false;
  list=[
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-house',
      path: 'dashboard' 
    },

    {
      number: '2',
      name: 'Produits',
      icon: 'fa-solid fa-box',
      path: 'produit' 
    },

    {
      number: '3',
      name: 'Entree',
      icon: 'fa-solid fa-arrow-up-right-from-square',
      path: 'entree' 
    },

    {
      number: '4',
      name: 'Sortie',Component: 'sortie',
      icon: 'fa-solid fa-share-from-square',
      path: 'sortie' 
    },

    {
      number: '5',
      name: 'Fournisseur',
      icon: 'fa-solid fa-user',
      path: 'fournisseur' 
    },

    {
      number: '6',
      name: 'Stock',
      icon: 'fa-solid fa-user',
      path: 'stock'  
    },
  ];
 
  constructor(){

  }
  ngOnInit():void{

  }
}
