import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  loginaccess:boolean=true;

  constructor(private router: Router,private http:HttpClient) { }


  // isauthenticated() {
  //   if (sessionStorage.getItem('token') !== null) {
  //     return false;
  //   }
  //   return false;    // this function retrun the true value means we can't access main page directly other wise false means we can access directly
  // }

  // // this set of code is use to block the direct access of main page
  // canAccess() {
  //   if (this.loginaccess) {
  //     this.router.navigate(["login"])
  //   }
  // }

// --------------------------------------
private apiUrl = 'http://172.16.71.2:3000/api';
private isLoggedInFlag = false;


login(email: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap((data:any) => {
        console.log(data)
        if (data.success) {
          this.isLoggedInFlag = true;
        }
      })
    );
}

isLoggedIn() {
  return this.isLoggedInFlag;
}

}
