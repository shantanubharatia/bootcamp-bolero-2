import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {

  newOrUpdatedDepartment: NewOrUpdatedDepartment = new NewOrUpdatedDepartment;
  isEditMode: boolean = false;

  public constructor(public departmentService : DepartmentService, private toastrService : ToastrService)
  {

  }

  editDepartment(departmentId: number)
  {
    this.isEditMode = true;
    var dep = this.departmentService.getDepartments().find(x => x.id == departmentId);

    if(dep!=null)
    {
      this.newOrUpdatedDepartment = {
        'id': dep.id,
        'name' : dep.name,
        'readOnly': dep.readOnly,
        'mandatory': dep.mandatory
      };
    }

    // setInterval(()=>{console.log(this.newOrUpdatedDepartment)},1000);
  }

  addNewDepartment()
  {
    this.isEditMode = false;
    this.newOrUpdatedDepartment = {
      'id': 0,
      'name' : '',
      'readOnly': false,
      'mandatory': false
    };
  }

  saveChanges()
  {
    if(this.newOrUpdatedDepartment.name === null || this.newOrUpdatedDepartment.name === '')
    {
      this.toastrService.error("Please enter a valid name");
    }
    else if(this.newOrUpdatedDepartment.readOnly)
    {
      this.toastrService.error("Readonly departments cannot be updated");
    }
    else
    {
      var requestBody = {
        'id':this.newOrUpdatedDepartment.id,
        'name':this.newOrUpdatedDepartment.name,
        'read_only': this.newOrUpdatedDepartment.readOnly,
        'mandatory': this.newOrUpdatedDepartment.mandatory
      };
      if(this.isEditMode)
      {
        this.departmentService.updateDepartment(requestBody);
      }
      else
      {
        this.departmentService.saveDepartment(requestBody);
      }
      document.getElementById("closeModalButton")?.click();
    }
  }

  deleteDepartment(department: Department)
  {
    if(department.readOnly)
    {
      this.toastrService.error("Read only departments cannot be deleted");
    }
    else
    {
      this.departmentService.deleteDepartment(department.id)
    }
  }
}

class NewOrUpdatedDepartment{
  'id': Number;
  'name': String;
  'readOnly': Boolean;
  'mandatory': Boolean;
}