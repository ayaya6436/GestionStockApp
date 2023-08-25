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
    },

    {
      number: '2',
      name: 'Produits',
      icon: 'fa-solid fa-box',
    },

    {
      number: '3',
      name: 'Entree',
      icon: 'fa-solid fa-arrow-up-right-from-square',
    },

    {
      number: '4',
      name: 'Sortie',
      icon: 'fa-solid fa-share-from-square',
    },
  ];
 
  constructor(){

  }
  ngOnInit():void{

  }
}
