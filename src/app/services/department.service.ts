import { Injectable } from '@angular/core';
import { Department } from '../models/department';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/app.constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departments : Department[] = [];
  constructor(private httpClient : HttpClient, private toastrService : ToastrService) { 
    this.fetchAllDepartments();
  }

  fetchAllDepartments()
  {
    this.httpClient.get<Department[]>(AppConstants.baseUrl + AppConstants.endPointDepartments).subscribe(x => {
      this.departments = x;
    })
  }

  getDepartments()
  {
    return this.departments;
  }

  updateDepartment(dep: any)
  {
    this.httpClient.put(AppConstants.baseUrl + AppConstants.endPointDepartments, dep)
      .subscribe({ complete : () => {
        this.toastrService.success("Successfully updated department");
        this.fetchAllDepartments();
      },
      error : (err) => {
        console.log(err);
       this.toastrService.error("Error occurred while updating department");
      }});
  }

  saveDepartment(dep: any)
  {
    this.httpClient.post(AppConstants.baseUrl + AppConstants.endPointDepartments, dep)
      .subscribe({ complete : () => {
        this.toastrService.success("Successfully saved department");
        this.fetchAllDepartments();
      },
      error : (err) => {
        console.log(err);
        this.toastrService.error("Error occurred while saving department");
      }});
  }

  deleteDepartment(depId: any)
  {
    this.httpClient.delete(AppConstants.baseUrl + AppConstants.endPointDepartments + "/" + depId)
    .subscribe({ complete : () => {
      this.toastrService.success("Successfully deleted department");
      this.fetchAllDepartments();
    },
    error : (err) => {
      console.log(err);
      this.toastrService.error("Error occurred while deleting department");
    }});
  }
}
