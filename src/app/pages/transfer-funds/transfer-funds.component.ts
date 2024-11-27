import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Manages fund transfers between accounts
 * Handles validation, balance checking, and transfer execution
 */
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

  // Constructor loads existing accounts from local storage.
  // If no accounts are found, initializes an empty array.
  constructor(private fb: FormBuilder) {
    const storedAccounts = localStorage.getItem('accountStorageLocal');
    this.accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
  }

  // Initialize the form group with validators for the transfer form.
  ngOnInit(): void {
    this.transferForm = this.fb.group({
      fromAccountNumber: ['', [Validators.required]],
      toAccountNumber: ['', [Validators.required]],
      transferAmount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  // Checks the account from which the funds are being transferred.
  checkFromAccount() {
    const fromAccountNumber = this.transferForm.get('fromAccountNumber')?.value;
    this.fromAccount = this.accounts.find(account => account.accountNumber === fromAccountNumber);
    if (this.fromAccount) {
      this.fromAccountBalance = this.fromAccount.balance;
    } else {
      this.fromAccountBalance = null;
    }
  }

  // Checks the account to which the funds are being transferred.
  checkToAccount() {
    const toAccountNumber = this.transferForm.get('toAccountNumber')?.value;
    this.toAccount = this.accounts.find(account => account.accountNumber === toAccountNumber);
    if (this.toAccount) {
      this.toAccountBalance = this.toAccount.balance;
    } else {
      this.toAccountBalance = null;
    }
  }

/**
 * Handles fund transfers between accounts:
 * - Validates sufficient balance
 * - Updates account balances
 * - Records transaction history
 * - Persists changes to localStorage
 * - Shows success/error alerts
 */
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
      this.updateBalances();
    } else {
      alert('Insufficient balance in From Account!');
    }
  }

  //resetFields() {
  //  this.transferForm.reset();
  //  this.fromAccountBalance = null;
  //  this.toAccountBalance = null;
  //  this.fromAccount = null;
  //  this.toAccount = null;
  //}

  updateBalances() {
    this.checkFromAccount();
    this.checkToAccount();
  }
  
  get isSameAccount(): boolean {
    return this.fromAccount && this.toAccount && this.fromAccount.accountNumber === this.toAccount.accountNumber;
  }

  get getTransactionAmount(){
    return this.transferForm.get('transferAmount')?.value;
  }
}
