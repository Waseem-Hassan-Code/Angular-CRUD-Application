import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent implements OnInit {

  addDepartmentForm;
  departmentExists: boolean = false;
  showDesignation: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private roter: Router
  ){}

  ngOnInit(): void {
    this.addDepartmentForm = new FormGroup({
      departmentName: new FormControl(null, Validators.required),
      designation : new FormArray([])
    })
  }

  onInputChange() {
    // Reset the boolean value
    this.departmentExists = false;
    this.showDesignation = false;
  }

  addDesignationInput(){
    let desig = new FormControl(null, Validators.required);
    (this.addDepartmentForm.get('designation')as FormArray).push(desig);
  }

  removeDesignationInput(index){
    (this.addDepartmentForm.get('designation')as FormArray).removeAt(index);
  }

  onAddDepartment(){
    if(this.showDesignation){
      if(this.addDepartmentForm.valid){
        console.log(this.addDepartmentForm.value);
        this.departmentService.addDepartment(this.addDepartmentForm.value).subscribe(response=>{
          console.log(response);
          this.toastr.success('Department Added');
          this.roter.navigate(['/department/view']);
        })
      }
    }else{

      let result;
      if(this.addDepartmentForm.valid){
        this.departmentService.getDepartmentByName(this.addDepartmentForm.value.departmentName).subscribe(response=>{
          console.log(response);
          result = response;
          console.log(result);
          if(result){
            this.departmentExists = true;
            console.log(this.departmentExists);
          }else{
            this.departmentExists = false;
            this.showDesignation = true;
            console.log("Does not exists");
          }
        });
      }

    }
    
  }
}
