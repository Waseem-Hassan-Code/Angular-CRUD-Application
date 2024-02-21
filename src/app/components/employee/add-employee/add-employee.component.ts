import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{

  addEmployeeForm;

  bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  genders = ["Male", "Female"];
  departmentsList;
  designationList = [];


  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      employeeName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
    });

    this.getDepartments();
  }

  getDepartments(){
    this.departmentService.getDepartment().subscribe(response=>{
      this.departmentsList = response;
      console.log(this.departmentsList);
    })

  }

  onDepartmentSelect(){
    console.log(this.addEmployeeForm.value.department);
    
    this.departmentService.getDepartmentByID(this.addEmployeeForm.value.department).subscribe(response=>{
      console.log(response);
      this.designationList = response['designation'];
    })
    console.log(this.designationList);
  }

  addEmployee(){
    console.log(this.addEmployeeForm.value);
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(response=>{
      console.log(response);
      this.toastr.success('Employee Added');
      this.router.navigate(['/employee/view']);
    })
  }
}
