import { Component } from '@angular/core';
import { error } from 'console';
import { Pet } from '../../models/pet';
import { PetParent } from '../../models/pet_parent';
import { Vet } from '../../../vets/models/vet';
import { Location } from '@angular/common';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Appointment } from '../../../appointments/models/appointment';
import { AppointmentService } from '../../../appointments/services/appointment-service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-pets-newappoint',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FormsModule,
    NgFor
  ],
  templateUrl: './pets-newappoint.component.html',
  styleUrl: './pets-newappoint.component.css',
})
export class PetsNewappointComponent {
  errorMessage: string = '';
  appointmentForm: any;
  minDate: string = '';
  petParentId: number = -1;
  selectedPetId: number = 0;
  selectedVetId: number = 0;
  selectedButton: string = '';
  newAppointment: Appointment = new Appointment();
  pets: Pet[] = [];
  petParent: PetParent = new PetParent();
  vets: Vet[] = [];
  time: Date = new Date();
  vetSlotes: string[] = [];
  selectedButtonIndex: number | null = null;
  role: any;
  constructor(private service: AppointmentService, private rt: Router, private location: Location, private fb: FormBuilder, private router: ActivatedRoute) {
    this.appointmentForm = this.fb.group({
      vetName: ['', Validators.required]
    });
    this.setMinDate();
  }

  goBack() {
    this.location.back()
  }

  setMinDate(): void {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();

    this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  selectButton(time: string) {
    this.selectedButton = time;
    const [hours, minutes] = time.split(':').map(Number);
    this.time.setHours(hours);
    this.time.setMinutes(minutes);
    this.newAppointment.appointment_time = time;
    localStorage.setItem('time', this.selectedButton);
    console.log(this.selectedPetId);
    console.log(this.selectedVetId);
  }

  getVetID(event: any) {
    this.selectedVetId = event.target.value;
    console.log(this.selectedVetId + "--" + this.time);
    let date = this.time.toString();
    this.getVetSchedules(this.selectedVetId, date);

  }

  getPetID(event: any) {
    this.selectedPetId = event.target.value;
  }

  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.petParentId = params['id'];
      this.role = params['role'];
    })

    this.service.getPets(this.petParentId).subscribe((data) => {
      this.pets = data;
    });

    this.service.getAllVets().subscribe((data) => {
      this.vets = data;
    });
  }

  onSumbitForm(): void {
    this.newAppointment.appointmentDate = this.time;
    this.newAppointment.appointment_time = this.selectedButton;

    this.service.addAppointment(this.newAppointment, this.selectedVetId, 1, this.selectedPetId).subscribe((data) => {
      console.log("deleted time:", this.selectedButton);
      this.service.updateVetSchedules(this.selectedVetId, `${this.time}`, this.selectedButton).subscribe(data => {
      });
      alert("Appointment Scheduled Succesfully")
    },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }


  getTime(date: any) {
    this.time = date.target.value
  }

  getVetSchedules(vetId: number, date: string) {
    console.log(this.selectedVetId)
    console.log(vetId);
    this.service.getVetSchedules(vetId, date).subscribe(data => {
      this.vetSlotes = data;
      if (this.vetSlotes == null || this.vetSlotes.length == 0) {
        alert("no slots available")
      }
      console.log(data)
    })
  }

  appTime(time: any, index: number) {
    this.selectButton = time;
    this.selectedButton = time
    this.selectedButtonIndex = index;
  }
}
