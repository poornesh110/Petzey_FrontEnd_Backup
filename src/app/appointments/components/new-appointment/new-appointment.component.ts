import { Component } from '@angular/core';
import { Appointment } from '../../models/appointment';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, Location, NgFor, Time } from '@angular/common';
import { Pet } from '../../../pets/models/pet';
import { PetParent } from '../../../pets/models/pet_parent';
import { AppointmentService } from '../../services/appointment-service';
import { Vet } from '../../../vets/models/vet';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

 
 
 
@Component({
  selector: 'app-new-appointment',
  standalone: true,
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css'],
  styles: [`input.ng-invalid{border-left:5px solid red;}
    input.ng-valid{border-left: 5px solid green;}` ],
 
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule, NgFor, HeaderComponent]
})
export class NewAppointmentComponent {
  errorMessage: string = ''
  appointmentForm: any
  minDate: string = ''
  petParentId: number = 0;
  selectedPetId: number = 0;
  selectedPetParentId: number = 0;
  selectedVetId: number = -1;
  selectedButton: any = '';
  newAppointment: Appointment = new Appointment();
  pets: Pet[] = [];
  petParent: PetParent = new PetParent;
  vets: Vet[] = []
  time: Date = new Date();
  vetSlotes: string[] = []
  petParents: PetParent[] = []
  dateString: string = ''
  timeError: string = ''
  isTimeSelected: boolean = false
  selectedButtonIndex: number | null = null;
  role: any;
  constructor(private service: AppointmentService, 
   private router:ActivatedRoute,private fb: FormBuilder, private location: Location, private route: Router) {
    this.setMinDate();
    this.ngOnInit();
  }
  setMinDate(): void {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
 
  appTime(time: any, index: number) {
    this.selectButton = time;
    this.selectedButton = time
    this.isTimeSelected = true
    this.selectedButtonIndex = index;
  }
  selectButton(time: string) {
    this.selectedButton = time;
    const [hours, minutes] = time.split(':').map(Number);
    this.time.setHours(hours);
    this.time.setMinutes(minutes);
 
    this.newAppointment.appointment_time = time
    localStorage.setItem("time", this.selectedButton);
  }
 
  getVetSchedules(vetId: number, date: string) {
    this.service.getVetSchedules(vetId, date).subscribe(data => {
      this.vetSlotes = data;
      if (this.vetSlotes == null || this.vetSlotes.length == 0) {
        alert("no slots available")
      }
    })
  }
  getPetParentID(event: any) {
    this.selectedPetParentId = event.target.value;
    this.service.getPets(this.selectedPetParentId).subscribe(data => {
      this.pets = data
 
    })
  }
  getPetID(event: any) {
    this.selectedPetId = event.target.value;
  }
  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.selectedVetId = params['id'];
      this.role=params['role'];
    })

    this.service.getAllPetParents().subscribe(data => {
      this.petParents = data;
    })
  }
 
  getTime(date: any) {
    this.time = date.target.value
    this.getVetSchedules(this.selectedVetId, date.target.value)
  }
  onSumbitForm(): void {
    this.newAppointment.appointmentDate = this.time
    this.newAppointment.appointment_time = this.selectedButton;
    if (this.isTimeSelected) {
      this.timeError = ''
      this.service.addAppointment(this.newAppointment, this.selectedVetId, this.selectedPetParentId, this.selectedPetId).subscribe(data => {
        this.service.updateVetSchedules(this.selectedVetId, `${this.time}`, this.selectedButton).subscribe(data => {
        });
        alert("Appointment Scheduled Succesfully")
        this.route.navigate(['/dashboard'], {
          queryParams: {
            role: this.role,
            id: this.selectedVetId
          },
        });
      },
        (error) => {
          alert('Error in Scheduling Appointment')
          this.errorMessage = error.message;
        });
    }
    else {
      this.timeError = 'time required'
      alert('please select Time for Appointment')
    }
  }
 
  handlingError(message: any) {
    let errorDiv = document.getElementById('errorDiv');
    if (errorDiv) {
      errorDiv.innerHTML = message.message;
 
    }
  }
 
  goBack() {
    this.location.back()
  }
 
 
}