import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { url } from '../../../environments/environment';

@Component({
  selector: 'app-fg-master-table',
  templateUrl: './fg-master-table.component.html',
  styleUrls: ['./fg-master-table.component.css']
})
export class FgMasterTableComponent implements OnInit {
  aadhar:any;
  usersArray :any[]= []

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   
  }
  

  loadall(){
   
    this.http.get(`${url}fg_master`).subscribe((res:any)=>
    {
      this.usersArray =res;
    },
    )
  }

  loadUser() {
   

    this.http.get(`${url}fg_master/${this.aadhar}`).subscribe(
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
 

    console.log(userObj)
    this.http.put(`${url}fg_master_resource/${this.aadhar}`, userObj).subscribe(
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
  
  

  getaadhar(){
    console.log(this.aadhar)
  }


}
