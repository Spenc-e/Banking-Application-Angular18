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
   * Transfers funds from one account to another.
   * 
   * This method performs the following steps to transfer funds between accounts:
   * 1. Retrieves the transfer amount from the form.
   * 2. Checks the 'from' account has sufficient balance.
   * 3. Deducts the transfer amount from the 'from' account balance.
   * 4. Adds the transfer amount to the 'to' account balance.
   * 5. Creates a transaction record with details of the transfer.
   * 6. Updates the transaction history in local storage.
   * 7. Updates the account balances in local storage.
   * 8. Displays a success alert and resets the form fields.
   * 
   * If the 'from' account does not have sufficient balance, an alert is displayed indicating insufficient funds.
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
      this.resetFields();
    } else {
      alert('Insufficient balance in From Account!');
    }
  }

  // Method to reset the form fields.
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

  // Getter for the transfer amount.
  getTransctionAmount(){
    return this.transferForm.get('transferAmount')?.value;
  }
}
