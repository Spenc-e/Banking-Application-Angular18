import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent implements OnInit {

  // Object to store account details
  accountObj: any = {
    accountNumber: this.generateAccountNumber(),
    accountType: '',
    accountBalance: 0
  };

  accountForm!: FormGroup;
  localArray: any[] = [];

  constructor(private fb: FormBuilder) {}

  // Initialize the form
  ngOnInit(): void {
    this.accountForm = this.fb.group({
      accountNumber: '',
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      accountType: ['', Validators.required],
      balance: [0],
    });
    // Get the local storage data
    const registerlocalData = localStorage.getItem("accountStorageLocal");
    if (registerlocalData !== null){
      this.localArray = JSON.parse(registerlocalData);
    }
  }

  // Method to create account
  createAccount(): void {
    let formData = this.accountForm.value
    formData.accountNumber = this.generateAccountNumber();
    formData.balance = formData.initialBalance;
    this.localArray.push(formData)
    localStorage.setItem("accountStorageLocal", JSON.stringify(this.localArray));
    this.accountForm.reset({
      initialBalance: 0
    });

  }

  // Get account type
  get accountType() {
    return this.accountForm.get('accountType')?.value;
  }

  // Generate account number
  generateAccountNumber(): string {
    const localData = localStorage.getItem("accountStorageLocal");
    let nextNumber = 1;
    if (localData) {
      const users = JSON.parse(localData);
      nextNumber = users.length + 1;
    }
    return '1' + nextNumber.toString().padStart(5, '0');
  }



}
