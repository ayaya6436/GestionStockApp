import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'gestionStockApp';
  sideBarStatus : boolean = false;

  // definition de la liste pour contenir les images et autres
  list=[
    {
      number : '1',
      name:'imageVectorDashbaoard',
      image:'../assets/images/undraw_empty_cart_co35.svg'
    }
  ];

  constructor(){
    
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
