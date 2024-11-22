import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  searchQuery: string = '';

  // Initialize the form for transaction history
  ngOnInit(): void {
    const storedHistory = localStorage.getItem('transactionHistory');
    if (storedHistory) {
      this.transactions = JSON.parse(storedHistory);
      this.filteredTransactions = this.transactions;
    }
  }

  // Method to search transaction
  onSearchChange(): void {
    if (this.searchQuery) {
      this.filteredTransactions = this.transactions.filter(transaction =>
        Object.values(transaction).some((value:any) =>
          value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }

}
