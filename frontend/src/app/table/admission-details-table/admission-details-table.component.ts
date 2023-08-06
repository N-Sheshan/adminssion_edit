import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { url } from '../../../environments/environment';

@Component({
  selector: 'app-admission-details-table',
  templateUrl: './admission-details-table.component.html',
  styleUrls: ['./admission-details-table.component.css']
})
export class AdmissionDetailsTableComponent implements OnInit {
  aadhar:any;
  
  usersArray :any[]= []
  year=null;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   
  }
  

  loadall(){
   
    this.http.get(`${url}admission_details`).subscribe((res:any)=>
    {
      this.usersArray =res;
    },
    )
  }

  loadUser() {
  

    this.http.get(`${url}admission_details/${this.aadhar}`).subscribe(
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
    this.http.put(`${url}admission_details_resource/${this.aadhar}`, userObj).subscribe(
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
