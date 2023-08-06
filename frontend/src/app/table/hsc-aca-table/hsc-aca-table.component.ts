import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { url } from '../../../environments/environment';

@Component({
  selector: 'app-hsc-aca-table',
  templateUrl: './hsc-aca-table.component.html',
  styleUrls: ['./hsc-aca-table.component.css']
})
export class HscAcaTableComponent implements OnInit {
  aadhar:any;
  
  usersArray :any[]= []
  year=null;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

  }
  

  loadall(){
   
    this.http.get(`${url}hsc_aca`).subscribe((res:any)=>
    {
      this.usersArray =res;
    },
    )
  }

  loadUser() {
    
    this.http.get(`${url}hsc_aca/${this.aadhar}`).subscribe(
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
    userObj.acatot = (
      userObj.acasub1 +
      userObj.acasub2 +
      userObj.acasub3 +
      userObj.acasub4 +
      userObj.acasub5 +
      userObj.acasub6
    ).toFixed(2);
    userObj.acacutoff = (
      userObj.acasub3 +
      ((userObj.acasub4 + userObj.acasub5) / 2)
    ).toFixed(2);
  
    userObj.acapcm = (
      (userObj.acasub3 + userObj.acasub4 + userObj.acasub5) / 3
    ).toFixed(2);
    userObj.acatot = parseFloat(userObj.acatot);
    userObj.acacutoff = parseFloat(userObj.acacutoff);
    userObj.acapcm = parseFloat(userObj.acapcm);
    

    this.http.put(`${url}hsc_aca_resource/${this.aadhar}`, userObj).subscribe(
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
