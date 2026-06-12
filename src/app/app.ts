import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeesModel } from './model/EmployeesModel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Employee');

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeesModel = new EmployeesModel();
  employeelist: EmployeesModel[] = [];
  isEditMode: boolean = false;

  constructor() {
    this.createForm();
    debugger;
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      this.employeelist = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      state: new FormControl(this.employeeObj.state),
      emailId: new FormControl(this.employeeObj.emailId),
      contactno: new FormControl(this.employeeObj.contactno),
      address: new FormControl(this.employeeObj.address),
      pincode: new FormControl(this.employeeObj.pincode),
    });
  }

  onSave() {
    if (this.isEditMode) {
      // EDIT: find the employee in the list by empId and replace their data
      const index = this.employeelist.findIndex((e) => e.empId === this.employeeForm.value.empId);
      if (index !== -1) {
        this.employeelist[index] = this.employeeForm.value;
      }
      this.isEditMode = false;
    } else {
      // ADD: assign a new id and insert at the top
      const oldData = localStorage.getItem('EmpData');
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      } else {
        this.employeeForm.controls['empId'].setValue(1);
      }
      this.employeelist.unshift(this.employeeForm.value);
    }

    localStorage.setItem('EmpData', JSON.stringify(this.employeelist));
    this.employeeObj = new EmployeesModel();
    this.createForm();
  }

  onEdit(emp: EmployeesModel) {
    this.isEditMode = true;
    this.employeeObj = emp;
    this.createForm();
  }
  onReset() {
    this.isEditMode = false;
    this.employeeObj = new EmployeesModel();
    this.createForm();
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      const index = this.employeelist.findIndex((m) => m.empId == id);
      this.employeelist.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeelist));
    }
  }
}
