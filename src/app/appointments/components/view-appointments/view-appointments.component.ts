import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard_service/dashboard.service';
import { Appointment } from '../../models/appointment';
import { CommonModule } from '@angular/common';
import { AppointmentSummaryComponent } from '../appointment-summary/appointment-summary.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  CognitoService,
  IUser,
} from '../../../authentication/Service/cognito.service';
import { Vet } from '../../../vets/models/vet';
import { Pet } from '../../../pets/models/pet';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentSummaryComponent,
    RouterOutlet,
    RouterLink,
    FormsModule,
  ],

  templateUrl: './view-appointments.component.html',
  styleUrl: './view-appointments.component.css',
})
export class ViewAppointmentsComponent {
  constructor(
    private service: DashboardService,
    private rt: Router,
    private route: ActivatedRoute,
    private cognitoservice: CognitoService
  ) {
    this.currentUser = {} as IUser;
  }
  currentUser: IUser;
  role: string = 'vet';
  allAppointment: Appointment[] = [];
  showNoAppointmentsMessage: boolean = false
  card: any;
  appointmentId: number = 0;
  myObject: { [key: number]: any } = {};
  myVetObject: { [key: number]: any } = {};

  ispet() {
    return this.role == 'pet';
  }

  isvet() {
    return this.role == 'vet';
  }

  async ngOnInit() {
    await this.getAllApointment();

    await this.getmicroservicedata();

    this.route.params.subscribe(params => {
      this.appointmentId = params['appointmentId'];
      console.log('Appointment ID:', this.appointmentId);
    });
  }

  getcurrentuser() {
    console.log(this.cognitoservice.getUser());
  }

  vetID: number = 701;
  petId: number = 900;

  async getmicroservicedata() {
    console.log('microservice is called');
    this.allAppointment.forEach(async (appointment) => {
      console.log(appointment.petId);
      const petdata = await this.getPetData(appointment.petId);
      const vetdata = await this.getVetData(appointment.vetId);
    });
  }

  getPetById(id: number) {
    return this.myObject[id];
  }

  getVetById(id: number) {
    return this.myVetObject[id];
  }

  async getAllApointment() {
    if (this.isvet()) {
      try {
        await this.service
          .getAllAppointments(this.vetID)
          .subscribe((data: Appointment[]) => {
            this.allAppointment = data;
            if (data.length === 0) {
              this.showNoAppointmentsMessage = true
            }
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    } else if (this.ispet()) {
      try {
        await this.service
          .getAllAppointmentsbypetId(this.petId)
          .subscribe((data: Appointment[]) => {
            this.allAppointment = data;
            console.log(data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getSelectedOption(event: Event): Promise<void> {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(selectedOption);
    if (selectedOption == 'ALL') {
      try {
        await this.getAllApointment();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await this.service
          .getAppointmentbyFilterbyvetID(this.vetID, selectedOption)
          .subscribe((data: Appointment[]) => {
            this.allAppointment = data;
            if (data.length === 0) {
              this.showNoAppointmentsMessage = true
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    this.goToFirstPage()
  }

  async getVetData(id: number) {
    try {
      await this.service.getvetdetails(id).subscribe((data) => {
        this.myVetObject[id] = data;
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
  navigate(id: number, vetId: number, petParentId: number, petId: number) {
    this.rt.navigate(['/details'], {
      queryParams: {
        data: id,
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

  navigate1(vetName: string, vetId: number) {
    console.log(vetName + '  ' + vetId);
 
    this.rt.navigate([`/chat/${vetId}`], {
      queryParams: {
        name: vetName,
      },
    });
  }
}
