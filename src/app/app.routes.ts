import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component'
import { TransferFundsComponent } from './pages/transfer-funds/transfer-funds.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { AccountCreationComponent } from './pages/account-creation/account-creation.component';

export const routes: Routes = [
    {   
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    }, 
    { 
        path: '', 
        component: LayoutComponent, 
        children: [
            {
                path: 'transfer-funds',
                component: TransferFundsComponent
            },
            {
                path: 'transaction-history',
                component: TransactionHistoryComponent
            },
            {
                path: 'account-creation',
                component: AccountCreationComponent
            }
        ]
    }
];
