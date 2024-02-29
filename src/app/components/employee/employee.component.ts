import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  newOrUpdatedEmployee: newOrUpdatedEmployee = new newOrUpdatedEmployee;
  isEditMode: boolean = false;
  
  public constructor(public employeeService : EmployeeService, public departmentService : DepartmentService,
    private toastrService : ToastrService) 
  {
    this.employeeService.fetchAllEmployees();
  }

  getEmployeeDepartmentNames(employee: Employee)
  {
    return employee.departments.map(x => x.name).reduce(
      (a, b) => a + (', ') + b)
  }

  editEmployee(employeeId: number)
  {
    this.isEditMode = true;
    var emp = this.employeeService.getEmployees().find(x => x.id == employeeId);
    
    if(emp!=null)
    {
      this.newOrUpdatedEmployee = {
        'id': emp.id,
        'name' : emp.name,
        'departmentIds' : new Set(emp.departments.map(x => x.id))
      };
    }

    // setInterval(()=>{console.log(this.newOrUpdatedEmployee)},1000);
  }

  addNewEmployee()
  {
    this.isEditMode = false;
    this.newOrUpdatedEmployee = {
      'id': 0,
      'name' : '',
      'departmentIds' : new Set()
    };
  }

  updateDepartmentsForEmployee(event: Event, deptId : number)
  {
    if((<HTMLInputElement>event.target)['checked'])
    {
      this.newOrUpdatedEmployee.departmentIds.add(deptId);
    }
    else
    {
      this.newOrUpdatedEmployee.departmentIds.delete(deptId);
    }
  }

  isDepartmentAssociatedWithEmployee(deptId : number)
  {
    return this.newOrUpdatedEmployee.departmentIds?.has(deptId);
  }

  saveChanges()
  {
    if(this.newOrUpdatedEmployee.name === null || this.newOrUpdatedEmployee.name === '')
    {
      this.toastrService.error("Please enter a valid name");
    }
    else
    {
      var requestBody = {
        'id':this.newOrUpdatedEmployee.id,
        'name':this.newOrUpdatedEmployee.name,
        'departments':[...this.newOrUpdatedEmployee.departmentIds].map(x => {return {'id':x}})
      };
      if(this.isEditMode)
      {
        this.employeeService.updateEmployee(requestBody);
      }
      else
      {
        this.employeeService.saveEmployee(requestBody);
      }
      document.getElementById("closeModalButton")?.click();
    }
  }
}

class newOrUpdatedEmployee{
  'id': Number;
  'name': String;
  'departmentIds' : Set<Number>;
}