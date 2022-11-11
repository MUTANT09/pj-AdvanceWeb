import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @Input() signup!: string;

  employeeForm = new FormGroup({
    //id: new FormControl('', [Validators.required]),
    EmpID: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
  });

  p = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private em: EmployeeService) {}

  ngOnInit(): void {
    console.log(this.signup);
  }

  Check(p1: any, p2: any) {
    var b = true;
    if (p1 === p2) {
      b = false;
    } else {
      b = true;
    }
    console.log(p1, p2);
    return b;
  }

  submit() {
    const e = JSON.parse(JSON.stringify(this.employeeForm.value));
    //console.log(e);
    //console.log(this.p.value);
    if (this.Check(e.password, this.p.value)) {
      alert('Passwords do not match');
      return;
    }
    if (this.employeeForm.invalid) {
      alert('Sign Up invalid!');
      return;
    }

    try {
      this.em.addEmployee(e).subscribe(
        (data) => {
          console.log(data);
          alert('Sign Up Successfully!');
          location.reload();
        },
        (err) => {
          console.log(err);
          alert('Sign Up fail!');
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  get password() {
    return this.employeeForm.get('password');
  }

  get email() {
    return this.employeeForm.get('email');
  }
}
