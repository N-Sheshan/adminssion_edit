import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceService } from '../_service/service.service';
 import {Router}  from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>()
  menuStatus:boolean = false;
  constructor(private authService:ServiceService,private router:Router ) { }
  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus)
  }

  ngOnInit(): void {
  }

  logout(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
