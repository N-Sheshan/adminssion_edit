import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { elementAt } from 'rxjs';
import { url } from '../../../environments/environment';
@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit {
  aadhar :any;
  
  usersArray :any[]= []
  year=null;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  

  loadall(){

    this.http.get(`${url}student_master`).subscribe((res:any)=>
    {
      this.usersArray =res;
    })
  }

  loadUser() {
    this.http.get(`${url}${this.aadhar}`).subscribe(
      (user: any) => {
        this.usersArray = user;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onEdit(userObj:any){
    this.usersArray.forEach(element=>{
      element.isEdit =false;
    })
    userObj.isEdit =true;

  }

  onUpdateData(userObj: any): void { 

    console.log(userObj.admission_Category)
    this.http.put(`${url}student_master_resource/${this.aadhar}`, userObj).subscribe(
      (response) => {
        console.log('Update successful:', response);
        alert("Data updated Successfully")
        // Handle successful update here
    
      },
      (error) => {
        console.error('Update failed:', error);
        alert("Data updated Falied")
        // Handle error here
      }
    );
    userObj.isEdit =false;
  }
  
  // onEdit(userObj: any) {
  //   debugger;
  //   this.usersArray.forEach(element => {
  //     element.isEdit = false;
  //   });
  //   userObj.isEdit = true;
  // }


  getaadhar(){
    console.log(this.aadhar)
  }

}
