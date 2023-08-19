import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../_service/service.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { onaccess } from  '../../environments/environment';
// import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
    email='';
    password='';
    errorMessage='';
  

  constructor(private authServer:ServiceService, private router: Router) { }

  ngOnInit(): void {

  }
  onsubmit(){
    // console.log(this.login)
  
  }
  
  login() {
    this.authServer.login(this.email, this.password).subscribe(
      (data:any) => {
        if (data.success) {
          // Login successful, redirect to dashboard
          this.router.navigate(['dashboard']);
        } else {
          this.errorMessage = data.message;
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred';
        console.error(error);
      }
    );
  }

}
