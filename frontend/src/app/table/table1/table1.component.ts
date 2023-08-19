import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { elementAt } from 'rxjs';
// import { url } from '../../../environments/environment';
// const  url = `http://172.16.1.5:3000/`;
const  url = `http://172.16.71.2:3000/`;
@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit {
  aadhar :any;
  vertical:boolean=true;
  horizontal:boolean=false;
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
    this.vertical=true;
    this.horizontal=false;
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
    if (this.aadhar != null){ 
    this.vertical=false;
    this.horizontal=true;}
  }

  onEdit(userObj:any){
    this.usersArray.forEach(element=>{
      element.isEdit =false;
    })
    userObj.isEdit =true;

  }

  onUpdateData(userObj: any): void { 
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
