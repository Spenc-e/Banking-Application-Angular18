import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Transaction History Component
 * Manages display and filtering of banking transactions
 * Provides search functionality for transaction records
 */
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

  // Lifecycle hook that initializes the component to get the stored transaction history.
  ngOnInit(): void {
    const storedHistory = localStorage.getItem('transactionHistory');
    if (storedHistory) {
      this.transactions = JSON.parse(storedHistory);
      this.filteredTransactions = this.transactions;
    }
  }

  // A real-time search handler to filter the transaction history based on the search query.
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
