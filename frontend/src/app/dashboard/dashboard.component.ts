import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../_service/service.service';
import {AuthGuardGuard} from '../auth-guard.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Office eidt';
  sideNavStatus:boolean = false;
  constructor(private auth:ServiceService,private garde:AuthGuardGuard) { }

  ngOnInit(): void {
    // this.garde;
  }

}
