import { Component } from '@angular/core';
import { CognitoService, IUser } from '../../Service/cognito.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userdetails } from '../../models/userDetails';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  isConfirm: boolean;
  isNotRegistered: boolean;
  userI: IUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cognitoService: CognitoService
  ) {
    this.isConfirm = false;
    this.isNotRegistered = true;
    this.userI = {} as IUser;
  }
  user: userdetails = {
    role: '',
    name: '',
    emailid: '',
  };

  public signUp(): void {
    // if (!this.validatePassword(this.userI.password)) {
    //   console.log('Password does not meet the criteria');
    //   return;
    // }
    this.cognitoService
      .signup(this.userI)
      .then(() => {
        this.isConfirm = true;
        this.isNotRegistered = false;
        console.log('Updated');
      })
      .catch(() => {
        console.log('something went wrong with signup');
      });
  }

  public confirmSignUp(): void {
    this.cognitoService
      .confirmSignUp(this.userI)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(() => {
        console.log('something went wrong with signup');
      });
  }
  onsubmitdata() {
    this.user = {
      // userId:userId,
      emailid: this.userI.email,
      name: this.user.name,
      role: this.user.role,
    };
    console.log(this.user);
    this.http.post(this.cognitoService.dataUrl, this.user).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log('onclick button finished');
  }

  // public validatePassword(password: string): boolean {
  //   // Minimum 8 characters
  //   if (password.length < 8) {
  //     return false;
  //   }

  //   // Minimum one uppercase letter
  //   if (!/[A-Z]/.test(password)) {
  //     return false;
  //   }

  //   // Minimum one lowercase letter
  //   if (!/[a-z]/.test(password)) {
  //     return false;
  //   }

  //   // Minimum one digit
  //   if (!/\d/.test(password)) {
  //     return false;
  //   }

  //   // Minimum one special character
  //   if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
  //     return false;
  //   }

  //   return true;
  // }
}
