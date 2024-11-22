import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-funds',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css']
})
export class TransferFundsComponent implements OnInit {
  transferForm!: FormGroup;
  accounts: any[] = [];
  fromAccountBalance: number | null = null;
  toAccountBalance: number | null = null;
  fromAccount: any = null;
  toAccount: any = null;

  // Constructor to inject FormBuilder
  constructor(private fb: FormBuilder) {
    const storedAccounts = localStorage.getItem('accountStorageLocal');
    this.accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
  }

  // Initialize the form
  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccountNumber: ['', [Validators.required]],
      toAccountNumber: ['', [Validators.required]],
      transferAmount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // Method to check the funds coming from the account
  checkFromAccount() {
    const fromAccountNumber = this.transferForm.get('fromAccountNumber')?.value;
    this.fromAccount = this.accounts.find(account => account.accountNumber === fromAccountNumber);
    if (this.fromAccount) {
      this.fromAccountBalance = this.fromAccount.balance;
    } else {
      this.fromAccountBalance = null;
    }
  }

  // Method to check the funds going to the account
  checkToAccount() {
    const toAccountNumber = this.transferForm.get('toAccountNumber')?.value;
    this.toAccount = this.accounts.find(account => account.accountNumber === toAccountNumber);
    if (this.toAccount) {
      this.toAccountBalance = this.toAccount.balance;
    } else {
      this.toAccountBalance = null;
    }
  }

  // Method to transfer funds from one account to another
  transferFunds() {
    const transferAmount = this.transferForm.get('transferAmount')?.value;
    if (this.fromAccountBalance !== null && this.fromAccountBalance >= transferAmount) {
      this.fromAccount.balance -= transferAmount;

      this.toAccount.balance += transferAmount;
      const transaction = {
        sender: this.fromAccount.accountNumber,
        receiver: this.toAccount.accountNumber,
        amount: transferAmount,
        transferDate:new Date()
      };
      const storedHistory = localStorage.getItem('transactionHistory');
      let transactionHistory = storedHistory ? JSON.parse(storedHistory) : [];
      transactionHistory.push(transaction);
      localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

      localStorage.setItem('accountStorageLocal', JSON.stringify(this.accounts));

      alert('Transfer successful!');
      this.resetFields();
    } else {
      alert('Insufficient balance in From Account!');
    }
  }

  // Method to reset the form fields
  resetFields() {
    this.transferForm.reset();
    this.fromAccountBalance = null;
    this.toAccountBalance = null;
    this.fromAccount = null;
    this.toAccount = null;
  }
  get isSameAccount(): boolean {
    return this.fromAccount && this.toAccount && this.fromAccount.accountNumber === this.toAccount.accountNumber;
  }

  // Get the transfer amount
  getTransctionAmount(){
    return this.transferForm.get('transferAmount')?.value;
  }
}
