import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { AppConstants } from '../constants/app.constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];

  constructor(private httpClient : HttpClient, private toastrService : ToastrService) {
    this.fetchAllEmployees();
   }

  fetchAllEmployees()
  {
    this.httpClient.get<Employee[]>(AppConstants.baseUrl + AppConstants.endPointEmployees).subscribe(x => {
      this.employees = x;
    })
  }

  getEmployees()
  {
    return this.employees;
  }

  updateEmployee(emp: any)
  {
    this.httpClient.put(AppConstants.baseUrl + AppConstants.endPointEmployees, emp)
      .subscribe({ complete : () => {
        this.toastrService.success("Successfully updated employee");
        this.fetchAllEmployees();
      },
      error : (err) => {
        console.log(err);
      this.toastrService.error("Error occurred while updating employee");
      }});
  }

  saveEmployee(emp: any)
  {
    this.httpClient.post(AppConstants.baseUrl + AppConstants.endPointEmployees, emp)
      .subscribe({ complete : () => {
        this.toastrService.success("Successfully added employee");
        this.fetchAllEmployees();
      },
      error : (err) => {
        console.log(err);
      this.toastrService.error("Error occurred while adding employee");
      }});
  }

  deleteEmployee(empId: any)
  {
    this.httpClient.delete(AppConstants.baseUrl + AppConstants.endPointEmployees + "/" + empId)
      .subscribe({ complete : () => {
        this.toastrService.success("Successfully deleted employee");
        this.fetchAllEmployees();
      },
      error : (err) => {
        console.log(err);
      this.toastrService.error("Error occurred while deleting employee");
      }});
  }
}
