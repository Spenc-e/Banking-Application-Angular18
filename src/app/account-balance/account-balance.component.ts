import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

/**
 * Account-balance Component
 * Used to display the account balance of the current user.
 * Currently a in-progress component and will be updated in future.
 */
@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.css',
})
export class AccountBalanceComponent {
  // Stores the users account details fetched from the local storage, using 'any' type
  // since the structure might vary based on account types.
  userAccountDetail: any = [];

  // Tracks the type of account (e.g. Savings, Chequing)
  accountType = '';

  date: Date | null = null;
  day: number | null = null;
  month: number | null = null;
  year: number | null = null;

  // Lifestyle hook that initializes date-related properties.
  ngOnInit(): void {
    this.date = new Date();
    this.day = this.date.getDate();
    //  We ned to add +1 to the month since it is zero-based.
    this.month = Number(this.date.getMonth()) + 1;
    this.year = this.date.getFullYear();
  }

  get getCurrentUserBalance() {
    const localData = localStorage.getItem("accountStorageLocal");
    const currentUser = localStorage.getItem("currentUser");

    // If localData is not null, parse the data and store it in the userAccountDetail property.
    if (localData) {
      this.userAccountDetail = JSON.parse(localData);
    }

    // Find the current user's account number in the userAccount
    let current = this.userAccountDetail.find((p:any)=>p.accountNumber == currentUser);
    this.accountType = current ? current.accountType : '';
    return current ? current.balance : 0;
  }
}
