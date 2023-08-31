import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
// definition de la liste pour contenir les images et autres
list=[
  {
    number : '1',
    name:'imageVectorDashbaoard',
    image:'../assets/images/undraw_empty_cart_co35.svg'
  }
  
];

list1=[

    {
      number : '2',
      name:'imageVectorDashbaoard',
      image:'../assets/images/courbe.png'
    }
  
];


list2=[

  {
    number : '3',
    name:'imageVectorDashbaoard',
    image:'../assets/images/chariot.png'
  }

];


constructor(){
  
}
ngOnInit(): void {
  throw new Error('Method not implemented.');
}

}
