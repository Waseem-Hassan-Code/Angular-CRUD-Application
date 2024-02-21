import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css'
})
export class EditDepartmentComponent implements OnInit{
  
  routeSub: Subscription;
  departmentID;
  departmentData;

  editDepartmentForm;
  departmentExists: boolean = false;
  showDesignation: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private currRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.editDepartmentForm = new FormGroup({
      departmentName: new FormControl(null, Validators.required),
      designation : new FormArray([])
    });

    this.routeSub = this.currRoute.params.subscribe(params=>this.departmentID=params['id']);
    console.log(this.departmentID);
    

    this.getDepartmentDetails();
  }

  getDepartmentDetails(){
    this.departmentService.getDepartmentByID(this.departmentID).subscribe(response=>{
      this.departmentData = response;
      console.log(this.departmentData);

      if(this.departmentData['designation'].length>0){
        this.showDesignation=true;
        this.departmentData.designation.forEach(element => {
          this.addDesignationInput();
        });
      }

      this.editDepartmentForm.patchValue({
        departmentName: this.departmentData.departmentName,
        designation: this.departmentData.designation
      })
    })
  }

  onInputChange(){
    // Reset the boolean value
      this.departmentExists = false;
  }

  addDesignationInput(){
    let desig = new FormControl(null, Validators.required);
    (this.editDepartmentForm.get('designation')as FormArray).push(desig);
  }

  removeDesignationInput(index){
    (this.editDepartmentForm.get('designation')as FormArray).removeAt(index);
  }

  onUpdateDepartment(){
    // this.editDepartmentForm.value.id = this.departmentID;
    console.log(this.editDepartmentForm.value);
    console.log(this.departmentID);
    this.departmentService.editDepartment(this.departmentID, this.editDepartmentForm.value).subscribe(response=>{
      console.log(response);
      this.toastr.success('Department Details Updated');
      this.router.navigate(['/department/view']);
    })
  }
  
}
