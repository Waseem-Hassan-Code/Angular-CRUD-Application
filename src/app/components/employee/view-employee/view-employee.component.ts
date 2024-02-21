import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit{

  employeeOptions: DataTables.Settings = {};
  employeeTrigger = new Subject<any>

  employeeData;

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.employeeOptions = {
      pagingType: 'full_numbers',
      retrieve: true
    };

    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployee().subscribe(response=>{
      this.employeeData = response;
      console.log(this.employeeData);
      this.employeeTrigger.next(null);
    })
  }

  onEmployeeEdit(id){
    console.log(id);
    this.router.navigate(['/employee/edit/'+id]);
  }

  onEmployeeDelete(id){
    console.log(id);
    this.employeeService.deleteEmployee(id).subscribe(response=>{
      console.log(response);
      this.toastr.error('Employee Deleted');
      this.ngOnInit();
    })
  }
}
