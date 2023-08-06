import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { url } from '../../../environments/environment';

@Component({
  selector: 'app-hsc-voc-table',
  templateUrl: './hsc-voc-table.component.html',
  styleUrls: ['./hsc-voc-table.component.css']
})
export class HscVocTableComponent implements OnInit {
  aadhar:any;
  
  usersArray :any[]= []
  year=null;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  
  }
  

  loadall(){
 
    this.http.get(`${url}hsc_voc`).subscribe((res:any)=>
    {
      this.usersArray =res;
    },
    )
  }

  loadUser() {
    this.http.get(`${url}hsc_voc/${this.aadhar}`).subscribe(
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
       userObj.voctot = (
      userObj.vocsub1 +
       userObj.vocsub2 + 
       userObj.vocsub3 + 
       userObj.vocsub4 + 
       userObj.vocsub5 +
        userObj.vocsub6) .toFixed(2) ;
     userObj. voccutoff = ( 
      userObj.vocsub3 + ((userObj.vocsub4 + userObj.vocsub5)/2)) .toFixed(2) ;
     userObj. vocpcm = (
      ( userObj.vocsub3 + userObj.vocsub4 + userObj.vocsub5)/3 ) .toFixed(2) ;
      userObj.voctot = parseFloat(userObj.voctot);
    userObj.voccutoff = parseFloat(userObj.voccutoff);
    userObj.vocpcm = parseFloat(userObj.vocpcm);   
    this.http.put(`${url}hsc_voc_resource/${this.aadhar}`, userObj).subscribe(
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
