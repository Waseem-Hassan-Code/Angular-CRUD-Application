import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../services/department.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{

  editEmployeeForm;
  routerSub: Subscription;

  bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  genders = ["Male", "Female"];
  departmentsList;
  designationList = [];

  employeeID;
  employeeData;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private currRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.editEmployeeForm = new FormGroup({
      employeeName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
    });

    this.routerSub = this.currRoute.params.subscribe(params=>this.employeeID=params['id']);
    console.log(this.employeeID);
    this.getDepartments();
    this.getEmployeeData();
  }

  getEmployeeData(){
    this.employeeService.getEmployeeByID(this.employeeID).subscribe(response=>{
      this.employeeData = response;
      console.log(this.employeeData);

      this.editEmployeeForm.patchValue({
        employeeName: this.employeeData.employeeName,
        address: this.employeeData.address,
        department: this.employeeData.department,
        designation: this.employeeData.designation,
        email: this.employeeData.email,
        mobileNumber: this.employeeData.mobileNumber,
        gender: this.employeeData.gender,
        bloodGroup: this.employeeData.bloodGroup,
      });

      this.onDepartmentSelect();
    })
  }

  getDepartments(){
    this.departmentService.getDepartment().subscribe(response=>{
      this.departmentsList = response;
      console.log(this.departmentsList);
    })

  }

  onDepartmentSelect(){
    console.log(this.editEmployeeForm.value.department);
    
    this.departmentService.getDepartmentByID(this.editEmployeeForm.value.department).subscribe(response=>{
      console.log(response);
      this.designationList = response['designation'];
      console.log(this.designationList);
      this.editEmployeeForm.get('designation').setValue(this.designationList && this.designationList.length > 0 ? this.designationList[0] : '');
    })
  }

  updateEmployee(){
    console.log(this.editEmployeeForm.value);
    this.employeeService.editEmployee(this.employeeID, this.editEmployeeForm.value).subscribe(response=>{
      console.log(response);
      this.toastr.success('Employee Details Updated');
      this.router.navigate(['/employee/view']);
    });
  }
}
