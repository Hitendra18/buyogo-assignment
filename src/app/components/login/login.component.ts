import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';

// Reusable function for required fields with a minimum length
const requiredWithMinLength = (min: number) => [
  Validators.required,
  Validators.minLength(min),
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // tracks loading state
  isLoading = false;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    // check if user is already logged in
    // if yes then redirect to home page
    try {
      const user = JSON.parse(localStorage.getItem('user') || '') as User;
      if (user) this.router.navigate(['/home']);
    } catch (error) {
      localStorage.clear();
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', requiredWithMinLength(8)),
  });

  // Signup functionality
  handleSumbit = () => {
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // start loading spinner
    this.isLoading = true;
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (user.email && user.password) {
      this.dataService
        .loginUser({ email: user.email, password: user.password })
        .subscribe({
          next: (data) => {
            // store users details inside localStorage
            // after successful signup
            localStorage.setItem('user', JSON.stringify(data[0]));
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          error: () => {
            this.isLoading = false;
          },
        });
    }
  };

  // utility for getting relavent error messages
  getErrorMessage(controlName: string): string {
    function capitalize(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const control = this.loginForm.get(controlName);

    if (control?.touched && control?.dirty) {
      switch (true) {
        case control.hasError('required'):
          return `${capitalize(controlName)} is required`;

        case control.hasError('email'):
          return `Invalid ${controlName}`;

        case control.hasError('minlength'):
          const minLength = control.errors?.['minlength']?.requiredLength;
          return `${capitalize(controlName)} must be at least ${minLength} characters`;

        default:
          return '';
      }
    }

    return '';
  }
}
