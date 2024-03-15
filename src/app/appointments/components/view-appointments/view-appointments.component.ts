import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard_service/dashboard.service';
import { Appointment } from '../../models/appointment';
import { CommonModule, Location } from '@angular/common';
import { AppointmentSummaryComponent } from '../appointment-summary/appointment-summary.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../../pets/models/pet';
import { creds } from '../../../authentication/models/login';
import { IdControllerService } from '../../../shared/services/idController/id-controller.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentSummaryComponent,
    RouterOutlet,
    RouterLink,
    FormsModule,
    HeaderComponent,
  ],

  templateUrl: './view-appointments.component.html',
  styleUrl: './view-appointments.component.css',
})
export class ViewAppointmentsComponent {

  cred: creds = new creds();

  constructor(
    private service: DashboardService,
    private rt: Router,
    private router: ActivatedRoute,
    private login: IdControllerService,
    private location:Location
  ) { }


  role: string = '';
  allAppointment: Appointment[] = [];
  showNoAppointmentsMessage: boolean = false;
  card: any;
  appointmentId: number = 0;

  userid: number = 0;
  curruser: creds = new creds();

  myObject: { [key: number]: any } = {};
  myVetObject: { [key: number]: any } = {};

  async ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.userid = params['id'];
      this.role = params['role'];
    })

    console.log(this.userid, " ", " ", this.role)
    await this.getAllApointment();
    await this.getmicroservicedata();
  }

  currentuserDetails() {
    this.curruser = this.login.user
    console.log(this.login.user)
  }

  isPetOwner() {
    return this.role == 'PetOwner';
  }

  isVet() {
    return this.role == 'Vet';
  }

  async getmicroservicedata() {
    console.log('microservice is called');
    this.allAppointment.forEach(async (appointment) => {
      console.log(appointment.petId);
      const petdata = await this.getPetData(appointment.petId);
      const vetdata = await this.getVetData(appointment.vetId);
    });
  }

  navigate1(vetName: string, vetId: number) {
    console.log(vetName + '  ' + vetId);

    this.rt.navigate([`/chat/${vetId}`], {
      queryParams: {
        name: vetName,
        id:this.userid,
        role:this.role,
      },
    });
  }

  navigate2(petOwnerName: string, petId: number) {
    console.log(petOwnerName + '  ' + petId);

    this.rt.navigate([`/chat/${petId}`], {
      queryParams: {
        name: petOwnerName,
        id:this.userid,
        role:this.role,
      },
    });
  }

  getPetById(id: number) {
    return this.myObject[id];
  }

  getVetById(id: number) {
    return this.myVetObject[id];
  }

  async getAllApointment() {
    if (this.isVet()) {
      try {
        this.service
          .getAllAppointments(this.userid).pipe(catchError((error: any) => {
            console.error('Error fetching appointments:', error);
            return throwError('Failed to fetch appointments');
          }))
          .subscribe((data: Appointment[]) => {
            this.allAppointment = data;
            if (data.length === 0) {
              this.showNoAppointmentsMessage = true;
            }
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    } else if (this.isPetOwner()) {
      try {
        this.service
          .getAllAppointmentsbypetId(this.userid).
          pipe(catchError((error: any) => {
            console.error('Error fetching appointments:', error);
            return throwError('Failed to fetch appointments');
          }))
          .subscribe((data: Appointment[]) => {
            this.allAppointment = data;
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getSelectedOptionByVet(event: Event): Promise<void> {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(selectedOption);
    if (selectedOption == 'ALL') {
      try {
        this.getAllApointment();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.service
          .getAppointmentbyFilterbyvetID(this.userid, selectedOption).
          pipe(catchError((error: any) => {
            console.error('Error fetching appointments:', error);
            return throwError('Failed to fetch appointments');
          }))
          .subscribe((data: Appointment[]) => {
            console.log("petfilter is called")
            this.allAppointment = data;
            if (data.length == 0) {
              console.log(data.length == 0)
              this.showNoAppointmentsMessage = true
              console.log(this.showNoAppointmentsMessage)
            } else {
              this.showNoAppointmentsMessage = false
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    this.goToFirstPage()
  }

  async getSelectedOptionByPetParent(event: Event): Promise<void> {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(selectedOption);
    if (selectedOption == 'ALL') {
      try {
        this.getAllApointment()
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        this.service.getAppointmentbyFilterBypetParentID(this.userid, selectedOption).
          subscribe((data: Appointment[]) => {
            if (data.length == 0) {
              console.log(data.length == 0)
              this.showNoAppointmentsMessage = true
            } else {
              this.showNoAppointmentsMessage = false
            }
            this.allAppointment = data
          });
      } catch (error) {
        console.log(error)
      }
    }
    this.goToFirstPage()
  }


  async getVetData(id: number) {
    try {
      await this.service.getvetdetails(id).subscribe((data) => {
        this.myVetObject[id] = data;
        console.log(data)
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getPetData(id: number) {
    await this.service.getpetdetails(id).subscribe((data: Pet) => {
      this.myObject[id] = data;
      console.log(this.myObject[id]);
      return data;
    });
  }

  feedback = {
    doctorCompetenceRating: 0,
    treatmentOutcomeRating: 0,
    referthisdoctorRating: 0,
    additionalComments: '',
    appointmentProcessRating: 0,
  };


  navigate(appointmentId: number, vetId: number, petParentId: number, petId: number) {
    this.rt.navigate(['/details'], {
      queryParams: {
        id: this.userid,
        role: this.role,
        data: appointmentId,
        vetId: vetId,
        petParentId: petParentId,
        petId: petId,
      },
    });
  }

  onSubmit() {
    console.log('Submitting feedback for Appointment ID:', this.appointmentId);

    if (this.appointmentId) {
      this.service.submitFeedback(this.appointmentId, this.feedback).subscribe(
        (response: any) => {
          console.log('Feedback submitted successfully', response);
          this.resetForm();
          alert('Feedback submitted successfully');
        },
        (error: any) => {
          console.error('Error submitting feedback:', error);
          if (error.status === 400) {
            alert('Feedback submission failed: ' + error.error);
          } else if (error.status === 404) {
            alert('Appointment not found: ' + error.error);
          } else {
            alert('An error occurred: ' + error.error);
          }
        }
      );
    } else {
      console.error('Appointment ID is not found');
      alert('Appointment ID is not found');
    }
  }

  resetForm() {
    this.feedback = {
      doctorCompetenceRating: 0,
      treatmentOutcomeRating: 0,
      referthisdoctorRating: 0,
      additionalComments: '',
      appointmentProcessRating: 0,
    };
  }

  currentPage: number = 1;
  cardsPerPage: number = 8;

  getPaginatedCards(): Appointment[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return this.allAppointment.slice(startIndex, endIndex);
  }

  nextPage(): void {
    const totalPages = Math.ceil(
      this.allAppointment.length / this.cardsPerPage
    );
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    const totalPages = Math.ceil(
      this.allAppointment.length / this.cardsPerPage
    );
    return this.currentPage === totalPages;
  }

  goToFirstPage(): void {
    this.currentPage = 1;
  }

  goToLastPage(): void {
    const totalPages = Math.ceil(
      this.allAppointment.length / this.cardsPerPage
    );
    this.currentPage = totalPages;
  }
}
