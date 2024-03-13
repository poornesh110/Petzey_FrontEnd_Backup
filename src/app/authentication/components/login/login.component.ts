import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CognitoService, IUser } from '../../Service/cognito.service';
import { EmailValidator, FormsModule } from '@angular/forms';
import { creds } from '../../models/login';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CredserviceService } from '../../credservice.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  cred: creds = new creds();
  user: IUser;

  role: string = '';
  id: number = 0;
  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private http: HttpClient,
    private credservice: CredserviceService,
    private rt: Router
  ) {
    this.user = {} as IUser;
  }
  public async signIn(): Promise<void> {
    this.cognitoService
      .signIn(this.user)
      .then(async () => {
        console.log(this.user.email);
        // localStorage.setItem("lname",this.user.name)
        await this.getdetails(this.user.email);

        // if (this.cred.role == 'PetOwner') {
        //   this.router.navigate(['/pets/dashboard']);
        // } else if (this.cred.role == 'Vet') {
        //   this.router.navigate(['/header']);
        // } else {
        //   console.log('running');
        // }
        // } else {
        //   this.router.navigate(['/NewAppointmentComponent']);
        // }

        // this.router.navigate(['/receptionist']);
        console.log('signed in');
      })
      .catch(() => {
        console.log('something wrong with the sign in');
      });
  }
  async getdetails(email: string) {

    this.credservice.getdetails(email).subscribe((data) => {
      // console.log(data)
      this.cred = data;
      console.log(this.cred.role);
      console.log(this.cred.userid);
      console.log(this.cred.name);

      //  if(this.cred.role == 'Vet' || this.cred.role == 'PetOwner' && this.cred.userid != 0){
      //   this.rt.navigate(['/dashboard'], {
      //     queryParams: {
      //       role:data.role,
      //       id:data.userid
      //     },
      // });
      //  }
      if (this.cred.role == 'Vet' && this.cred.userid != 0) {
        this.rt.navigate(['/dashboard'], {
          queryParams: {
            role: data.role,
            id: data.userid
          },
        });
      } else if (this.cred.role == 'PetOwner' && this.cred.userid != 0) {
        this.rt.navigate(['/pets/dashboard'], {
          queryParams: {
            role: data.role,
            id: data.userid
          },
        });
      } else {
        alert("Invalid user")
      }
    })
    // console.log('function is being called');

    // this.credservice.getdetails(email).subscribe((data) => {
    //   this.cred = data;
    // });
  }
}
