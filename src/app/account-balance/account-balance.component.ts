import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.css',
})
export class AccountBalanceComponent {
  userAccountDetail: any = [];
  accountType = '';

  date: Date | null = null;
  day: number | null = null;
  month: number | null = null;
  year: number | null = null;

  ngOnInit(): void {
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = Number(this.date.getMonth()) + 1;
    this.year = this.date.getFullYear();
  }

  get getCurrentUserBalance() {
    const localData = localStorage.getItem("accountStorageLocal");
    const currentUser = localStorage.getItem("currentUser");
    
    if (localData) {
      this.userAccountDetail = JSON.parse(localData);
    }

    let current = this.userAccountDetail.find((p:any)=>p.accountNumber == currentUser);
    this.accountType = current ? current.accountType : '';
    return current ? current.balance : 0;
  }
}
