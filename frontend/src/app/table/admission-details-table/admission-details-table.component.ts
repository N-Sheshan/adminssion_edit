import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
// import { url } from '../../../environments/environment';
// const  url = `http://172.16.1.5:3000/`;
const  url = `http://172.16.71.2:3000/`;
@Component({
  selector: 'app-admission-details-table',
  templateUrl: './admission-details-table.component.html',
  styleUrls: ['./admission-details-table.component.css']
})
export class AdmissionDetailsTableComponent implements OnInit {
  aadhar:any;
  vertical:boolean=true;
  horizontal:boolean=false;
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
    this.vertical=true;
    this.horizontal=false;
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
