import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Account Login Component
 * Manages the login and registration of users
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoginView: boolean = true;
  currentUser: string = '';

  userRegisterObj: any = {
    username: '',
    password: '',
    accountNumber: this.generateUserAccountNumber(),
    email: '',
  };

  userLoginObj: any = {
    username: '',
    accountNumber: '',
    password: ''
  };

  // Router instance for navigation after successful login or registration.
  router = inject(Router);

  // Handles the new user registeration process.
  // It first Checks if the user is already registered.
  // If the user is not registered, adds the user to the local storage.
  onRegister() {
    const registerlocalData = localStorage.getItem("userStorageLocal");
    if (registerlocalData !== null){
      let localArray = JSON.parse(registerlocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem("userStorageLocal", JSON.stringify(localArray));
    } else {
      let localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem("userStorageLocal", JSON.stringify(localArray));
    }
    alert("User registered successfully");
  }

  // Handles the login process.
  // It first checks if the user is already registered.
  // If the user is registered, it navigates to the account creation page.
  // If not registered, it shows an alert message.
  onLogin() {
    const localData = localStorage.getItem("userStorageLocal");
    const currentUser = localStorage.getItem("currentUser");
    if (localData != null){
       let users = JSON.parse(localData);
      
      const isUserFound = users.find((m: any) => m.username === this.userLoginObj.username && m.password === this.userLoginObj.password);
      if (isUserFound != undefined){
        this.router.navigateByUrl('/account-creation');
        localStorage.setItem("currentUser", isUserFound.accountNumber);
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("No user found");
    }
  }

  // Generates an account number for the user account. 
  generateUserAccountNumber(): string {
    const localData = localStorage.getItem("userStorageLocal");
    let nextNumber = 1;
    if (localData) {
      const users = JSON.parse(localData);
      nextNumber = users.length + 1;
    }
    return '1' + nextNumber.toString().padStart(5, '0');
  }

}

