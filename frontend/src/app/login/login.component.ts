import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginfromdata = new FormGroup({
    username: new FormControl("",[Validators.required,Validators.pattern("[a-zA-Z].*")]),
    password : new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  });

  
get Username(){
  return this.loginfromdata.get("username") as FormControl 
}
get Password(){
  return this.loginfromdata.get("password") as FormControl 
}


  constructor() { }

  ngOnInit(): void {
  }

  onsubmit(){
   
  }

}
