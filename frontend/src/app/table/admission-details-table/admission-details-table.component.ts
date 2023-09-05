import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
// import { url } from '../../../environments/environment';
const  url = `http://172.16.1.5:3000/`;
// const  url = `http://172.16.71.2:3000/`;
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
    let lengths = 0; // Initialize lengths with a default value
    console.log(this.aadhar.toUpperCase());
    
    this.http.get(`${url}admission_details/${this.aadhar}`).subscribe(
      (user: any) => {
        this.usersArray = user;
        console.log(user)
        lengths = Object.keys(user).length;
        // Move the conditional logic here to ensure synchronization
        if (lengths !== 1) {
          console.log("inside the if " + lengths);
          this.vertical = true;
          this.horizontal = false;
        } else {
          console.log("from else statement " + lengths);
          this.vertical = false;
          this.horizontal = true;
        }
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
  onDateChange(newDate: string, userObj: any): void {
    userObj.dob = new Date(newDate);
  }

  showRowContent(row :any) {
    this.horizontal=true;
    this.vertical=false
    this.usersArray=[row]
  }



}
