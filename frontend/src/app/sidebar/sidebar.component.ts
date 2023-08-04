import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus:boolean = false;

  constructor() { }
  list=[
    {
      id:1,
      name:'Studdent_master',
      icon:'bx bx-table',
      link:'/dashboard/student_master'
    },
    {
      id:2,
      name:'additional_info',
      icon:'bx bx-table',
      link:'/dashboard/additional_info'
    },
    {
      id:3,
      name:'admission_details',
      icon:'bx bx-table',
      link:'/dashboard/admission_details'
    },
    {
      id:4,
      name:'fg_master',
      icon:'bx bx-table',
      link:'/dashboard/fg_master'
    },
    {
      id:5,
      name:'hsc_aca',
      icon:'bx bx-table',
      link:'/dashboard/hsc_aca'
    },
    {
      id:6,
      name:'hsc_voc',
      icon:'bx bx-table',
      link:'/dashboard/hsc_voc'
    },
   
  ]

  ngOnInit(): void {
  }

}
