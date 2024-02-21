import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../services/department.service';


@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrl: './view-department.component.css'
})
export class ViewDepartmentComponent implements OnInit{

  departmentOptions: DataTables.Settings = {};
  departmentTrigger = new Subject<any>

  departmentData;

  constructor(
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.departmentOptions = {
      pagingType: 'full_numbers',
      retrieve: true,
    };

    this.getDepartments();
  }

  getDepartments(){
    this.departmentService.getDepartment().subscribe(response=>{
      this.departmentData = response;
      console.log(this.departmentData);
      this.departmentTrigger.next(null);
    })
  }

  onDepartmentEdit(id){
    console.log(id);
    this.router.navigate(['/department/edit/'+id]);
  }

  onDepartmentDelete(id){
    console.log(id);
    this.departmentService.deleteDepartment(id).subscribe(response=>{
      console.log(response);
      this.toastr.error('Department Deleted');
      this.ngOnInit();
    })
  }
}
