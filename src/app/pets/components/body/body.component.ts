import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Appointment } from '../../../appointments/models/appointment';
import { DashboardService } from '../../../appointments/services/dashboard_service/dashboard.service';
import { Pet } from '../../models/pet';
import { PetServiceService } from '../../service/pet-service.service';
import { vets } from '../../models/vetdata';
import { Vet } from '../../../vets/models/vet';
import { HttpClient } from '@angular/common/http';
import { IdControllerService } from '../../../shared/services/idController/id-controller.service';
import { CognitoService, IUser } from '../../../authentication/Service/cognito.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-body',
  standalone: true,
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FormsModule
  ],
})
export class BodyComponent {
  currentUser: IUser;
  constructor(
    private service: DashboardService,
    private rt: Router,
    private route:ActivatedRoute,
    private cognitoservice: CognitoService,
    private petservice: PetServiceService,
    private http:HttpClient,
    private id:IdControllerService

  ) {
    this.currentUser = {} as IUser;
    console.log(id.getPetOwnerId())
  }

  showNoAppointmentsMessage: boolean = false;

  role: string = 'vet';
  allAppointment: Appointment[] = [];

  myObject: { [key: number]: any } = {};
  myVetObject:{[key:number]:any}={};
  card:any;
  userid:number=0;
  ispet(){
    return this.role=='pet';
  }

  isvet() {
    return this.role == 'vet';
  }


  async ngOnInit(){
    await this.getAllApointment()
    await this.getmicroservicedata()

    this.route.params.subscribe(params => {
      this.userid = params['id'];
      
    });
  
  }

  petparentId: number = 1;

  async getmicroservicedata() {
    console.log('microservice is called');
    this.allAppointment.forEach(async (appointment) => {
      console.log(appointment.vetId);
      const vetdata = await this.getVetData(appointment.vetId);
      console.log(vetdata);
      const petdata = await this.getPetData(appointment.petId);
    });
  }

  getPetById(id: number) {
    return this.myObject[id];
  }

  getVetById(id: number) {
    return this.myVetObject[id];
  }

  async getAllApointment() {
    try {
      await this.service
        .getAllAppointmentsbypetId(this.petparentId)
        .subscribe((data: Appointment[]) => {
          this.allAppointment = data;
          if (data.length === 0) {
            this.showNoAppointmentsMessage = true;
          }
        });
    } catch (error) {
      console.log(error);
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
          .getAppointmentbyFilterBypetParentID(this.petparentId, selectedOption)
          .subscribe((data: Appointment[]) => {
            if (data.length === 0) {
              this.showNoAppointmentsMessage = true;
            }
            this.allAppointment = data;
          });
      } catch (error) {
        console.log(error);
      }
    }
    this.goToFirstPage();
  }

  getVetData(id: number) {
    console.log(this.service.getvetdetails(id));
    this.service.getvetdetails(id).subscribe((data) => {
      this.myVetObject[id] = data;
      console.log(data);
      return data;
    });
  }

  async getPetData(id: number) {
    await this.service.getpetdetails(id).subscribe((data: Pet) => {
      this.myObject[id] = data;
      // console.log(this.myObject[id])
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
    this.rt.navigate(['/pets/details'], {
      queryParams: {
        data: id,
        vetId: vetId,
        petParentId: petParentId,
        petId: petId,
      },
    });
  }
 
 
  onSubmit() {
    console.log('Submitting feedback for Appointment ID:', this.userid);
 
    if (this.userid) {
      this.service.submitFeedback(this.userid, this.feedback).subscribe(
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
      // alert('Appointment ID is not found');
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
