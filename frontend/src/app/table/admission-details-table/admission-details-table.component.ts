import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
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
    // this.loadall()
    // console.log('answer'+this.aadhar)
  }
  

  loadall(){
    // const url = `http://172.16.71.2:3000/admission_details`;
    const url = `http://172.16.1.5:3000/admission_details`;
    this.http.get(url).subscribe((res:any)=>
    {
      this.usersArray =res;
    },
    )
  }

  loadUser() {
    // console.log("inside function "+this.aadhar)
    // const url = `http://172.16.71.2:3000/admission_details/${this.aadhar}`;
    const url = `http://172.16.1.5:3000/admission_details/${this.aadhar}`;

    this.http.get(url).subscribe(
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
    // const url = `http://172.16.71.2:3000/admission_details_resource/${this.aadhar}`;
    const url = `http://172.16.1.5:3000/admission_details_resource/${this.aadhar}`;

    console.log(userObj)
    this.http.put(url, userObj).subscribe(
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
