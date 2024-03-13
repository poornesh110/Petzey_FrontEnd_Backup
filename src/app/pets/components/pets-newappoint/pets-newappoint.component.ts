import { Component } from '@angular/core';
import { error } from 'console';
import { Pet } from '../../models/pet';
import { PetParent } from '../../models/pet_parent';
import { Vet } from '../../../vets/models/vet';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Appointment } from '../../../appointments/models/appointment';
import { AppointmentService } from '../../../appointments/services/appointment-service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pets-newappoint',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    CommonModule,
    HttpClientModule,
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
  petParentId: number = 1;
  selectedPetId: number = 0;
  selectedVetId: number = 0;
  selectedButton: string = '09:00';
  newAppointment: Appointment = new Appointment();
  pets: Pet[] = [];
  petParent: PetParent = new PetParent();
  vets: Vet[] = [];
  time: Date = new Date();
  vetSlotes: string[] = [];
  selectedButtonIndex: number | null = null;
  constructor(private service: AppointmentService, private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      vetName: ['', Validators.required]
    });
    this.setMinDate();
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
    console.log(this.selectedPetId);

  }

  ngOnInit(): void {
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
    console.log("petId" + this.selectedPetId);

    this.service.updateVetSchedules(this.selectedVetId, `${this.time}`, this.selectedButton).subscribe(data => {
    });
    this.service
      .addAppointment(
        this.newAppointment,
        this.selectedVetId,
        1,
        this.selectedPetId
      )
      .subscribe(
        (data) => { },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }


  getTime(date: any) {
    this.time = date.target.value
  }

  getVetSchedules(vetId: number, date: string) {
    this.service.getVetSchedules(vetId, date).subscribe(data => {
      this.vetSlotes = data;
    })
  }

  appTime(time: any, index: number) {
    this.selectButton = time;
    this.selectedButton = time
    this.selectedButtonIndex = index;
  }
}