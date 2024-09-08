import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Organization } from '../../models/organization';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgSelectModule,
} from '@ng-select/ng-select';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

// function for required fields with a minimum length
const requiredWithMinLength = (min: number) => [
  Validators.required,
  Validators.minLength(min),
];

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgSelectComponent,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    FormsModule,
    NgSelectModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  firstStep = true; // keep track of form stages
  isLoading = false; // keep track of loading state
  organizations: Organization[] = []; // list of available organizations

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // checks if user is already logged in
    // if yes then redirect it to home page
    try {
      const user = JSON.parse(localStorage.getItem('user') || '') as User;
      if (user) this.router.navigate(['/home']);
    } catch (error) {
      localStorage.clear();
    }

    // populate the organizations array
    this.dataService.getOrganizations('').subscribe({
      next: (data) => {
        this.organizations = data;
      },
    });
  }

  // form controls
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', requiredWithMinLength(2)),
    password: new FormControl('', requiredWithMinLength(8)),
    designation: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    pinCode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{6}'),
    ]),
    organizationId: new FormControl(null, Validators.required),
  });

  // toggling between form stages
  toggleStep = () => {
    this.firstStep = !this.firstStep;
  };

  // Signup features
  handleSumbit() {
    console.log('Form Sumbitted', this.signupForm);
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    const user: User = this.signupForm.value as unknown as User;
    this.dataService.createUser(user).subscribe({
      next: (data) => {
        // store the users data in localStorage
        // before signup
        localStorage.setItem('user', JSON.stringify(data));
        this.isLoading = false;
        this.router.navigate(['/home']);
        this.toastr.success('Successfully logged in!');
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Something went wrong, please try again!', 'Error');
      },
    });
  }

  // uitlity function for getting errors
  getErrorMessage(controlName: string): string {
    function capitalize(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const control = this.signupForm.get(controlName);

    if (control?.touched && control?.dirty) {
      switch (true) {
        case control.hasError('required'):
          return `${capitalize(controlName)} is required`;

        case control.hasError('email'):
          return `Invalid ${controlName}`;

        case control.hasError('minlength'):
          const minLength = control.errors?.['minlength']?.requiredLength;
          return `${capitalize(controlName)} must be at least ${minLength} characters`;

        case control.hasError('pattern'):
          return `${capitalize(controlName)} is invalid`;

        default:
          return '';
      }
    }

    return '';
  }

  // function to check if user filled the
  // first step form correctly
  isFirstStepValid() {
    const controls = this.signupForm.controls;
    return (
      controls.email.valid && controls.fullName.valid && controls.password.valid
    );
  }
}
