import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  addEmployee(data){
    return this.http.post('http://localhost:3000/api/employees',data);
  }

  getEmployee(){
    return this.http.get('http://localhost:3000/api/employees');
  }

  getEmployeeByID(id){
    return this.http.get(`http://localhost:3000/api/employees/${id}`);
  }

  editEmployee(id, data){
    return this.http.put(`http://localhost:3000/api/employees/${id}`, data);
  }

  deleteEmployee(id){
    return this.http.delete(`http://localhost:3000/api/employees/${id}`);
  }
}
