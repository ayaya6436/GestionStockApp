import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggleClicked = new EventEmitter<boolean>();

  menuStatus: boolean = false;

  sideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggleClicked.emit(this.menuStatus);
  }


  constructor(private auth: AuthService) {}
  ngOnInit(): void {}

  logoutUser() {
    this.auth.logout();
  }
}
