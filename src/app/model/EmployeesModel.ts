//supposing we dont have api data
export class EmployeesModel {
  empId: number;
  name: string;
  city: string;
  state: string;
  emailId: string;
  contactno: string;
  address: string;
  pincode: string;

  constructor() {
    this.empId = 1;
    this.name = '';
    this.state = '';
    this.city = '';
    this.emailId = '';
    this.contactno = '';
    this.address = '';
    this.pincode = '';
  }
}
