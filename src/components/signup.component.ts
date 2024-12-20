import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'signup-modal',
  template: `
    <div class="modal">
      <div class="modal-content">
        <span class="close-button" (click)="closeModal()">&times;</span>
        <div class="mb-4">
          <h2 class="font-medium text-2xl">Sign Up</h2>
          <p class="opacity-70 mt-2">Create an account to get started</p>
        </div>
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="fullName">Full Name*</label>
            <input class="border h-[45px] outline-none" type="text" id="fullName" formControlName="fullName" required>
          </div>
          <div class="form-group">
            <label for="email">Email*</label>
            <input class="border h-[45px] outline-none" type="email" id="email" formControlName="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password*</label>
            <input class="border h-[45px] outline-none" type="password" id="password" formControlName="password" required>
          </div>
          <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background-color: white;
      padding: 30px;
      border-radius: 5px;
      width: 400px;
      max-width: 100%;
    }

    .close-button {
      float: right;
      font-size: 24px;
      cursor: pointer;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
    }

    .form-group input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class SignupModalComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  closeModal() {
    // Logic to close the modal
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted', this.signupForm.value);
    }
  }
}
