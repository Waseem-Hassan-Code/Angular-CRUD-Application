import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  addDepartment(data){
    return this.http.post('http://localhost:3000/api/departments',data);
  }

  getDepartment(){
    return this.http.get('http://localhost:3000/api/departments');
  }

  getDepartmentByID(id){
    return this.http.get(`http://localhost:3000/api/departments/${id}`);
  }

  getDepartmentByName(name){
    return this.http.get(`http://localhost:3000/api/departments/byName/${name}`)
  }

  editDepartment(id ,data){
    return this.http.put(`http://localhost:3000/api/departments/${id}`, data);
  }

  deleteDepartment(id){
    return this.http.delete(`http://localhost:3000/api/departments/${id}`);
  }
}
