import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
// import { url } from '../../../environments/environment';
// const  url = `http://172.16.1.5:3000/`;
const  url = `http://172.16.71.2:3000/`;
@Component({
  selector: 'app-fg-master-table',
  templateUrl: './fg-master-table.component.html',
  styleUrls: ['./fg-master-table.component.css']
})
export class FgMasterTableComponent implements OnInit {
  aadhar:any;
  vertical:boolean=true;
  horizontal:boolean=false;
  usersArray :any[]= []
  inserts:boolean =false;
  allvalue:boolean=true;
  insert_value={
    admissionNo:null,
    year:null,
    fgNo:'',
    fgType:'' 
  }
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
   
  }
  

  loadall(){
    this.inserts=false
    this.http.get(`${url}fg_master`).subscribe((res:any)=>
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
    
    this.http.get(`${url}fg_master/${this.aadhar}`).subscribe(
      (user: any) => {
        this.usersArray = user;
        console.log(user)
        lengths = Object.keys(user).length;
        // Move the conditional logic here to ensure synchronization
        if (lengths !== 1) {
          console.log("inside the if " + lengths);
          this.vertical = true;
          this.horizontal = false;
          this.inserts=false
        } else {
          console.log("from else statement " + lengths);
          this.vertical = false;
          this.horizontal = true;
          this.inserts=false
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

  insert_to_db(): void {
    console.log(this.insert_value);
    this.http.post(`${url}add_fg_master`, this.insert_value).subscribe(
      (response) => {
        console.log('Update successful:', response);
        alert("Data inserted Successfully")
        // Handle successful update here
    
      },
      (error) => {
        console.error('Update failed:', error);
        alert("Data inserted Falied")
        // Handle error here
      }

    );
   this.insert_value={
    admissionNo:null,
    year:null,
    fgNo:'',
    fgType:'' 
  }
  }
  
  
  onUpdateData(userObj: any): void {
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


  insert(){
    if (this.inserts === false){
      this.inserts= true;
      this.allvalue=false;
      this.vertical=false;
      this.horizontal=false;
    }
   
  };

 
  onDateChange(newDate: string, userObj: any): void {
    userObj.dob = new Date(newDate);
  }

  showRowContent(row :any) {
    this.horizontal=true;
    this.vertical=false
    this.inserts=false
    this.allvalue=false;
    this.usersArray=[row]
  }


}
