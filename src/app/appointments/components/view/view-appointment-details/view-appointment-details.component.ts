import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../../models/appointment';
import { AppointmentService } from '../../../services/appointment-service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Vet } from '../../../../vets/models/vet';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
 
 
@Component({
  selector: 'app-view-appointment-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet, NgIf],
  templateUrl: './view-appointment-details.component.html',
  styleUrl: './view-appointment-details.component.css'
})
export class ViewAppointmentDetailsComponent {
 
 
  minDate:string=''
  isClosed: boolean = false
  isCancelled: boolean = false
  id: number = 0
  constructor(
    private appointmentService: AppointmentService,
     private rt: ActivatedRoute ,
     private router:Router,
     private location :Location) {
      this.setMinDate()
      }
 
     setMinDate(): void {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const year = today.getFullYear();
      this.minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }
 
  onCall() {
    console.log('Call button clicked');
  }
 
  onChat() {
    console.log('Chat button clicked');
  }
 
  onClose() {
    console.log('Close button clicked');
  }
 
  onCancel() {
    console.log('Cancel button clicked');
  }
 
  onSubmit() {
    console.log("called")
  }
 
  cancelSubmit() {
 
    // try {
    //   this.appointmentService.cancel_appointment(this.id).subscribe(data => {
    //     this.reloadPage();
    //     alert('Appointment with Id  ' + this.id + " cancelled succesfully")
    //   })
    // } catch (error) {
    //   this.reloadPage();
    //   alert('Appointment with Id  ' + this.id + " cancelled succesfully")
    // }
    this.appointmentService.cancel_appointment(this.id).subscribe(response =>{
      // console.log('Closed Successfully', response)
       alert('Appointment with Id  '+this.id+" closed succesfully")
     },
     error => {
       alert('Appointment with Id  '+this.id+" closed succesfully")
     }
    )
  }
 
  closeSubmit() {
    // try {
    //   this.appointmentService.close_appointment(this.id).subscribe(data => {
    //     this.reloadPage();
    //     alert("Appointment with Id  " + this.id + " closed succesfully")
    //   })
    // }
    // catch (error) {
    //   this.reloadPage();
    //   alert("Appointment with Id  " + this.id + " closed succesfully")
    // }
    this.appointmentService.close_appointment(this.id).subscribe(
      response =>{
       // console.log('Closed Successfully', response)
        alert('Appointment with Id  '+this.id+" closed succesfully")
      } ,
      error => {
        alert('Appointment with Id  '+this.id+" closed succesfully")
      }
    );
  }
 
 
  vets: Vet[] = []
  doctorName: string = ''
  appointment: Appointment = new Appointment
 
  ngOnInit(): void {
    this.rt.queryParams.subscribe(params => {
      this.id = params['data'];
    })
    this.appointmentService.getAppointmentDetails(this.id).subscribe(data => {
      this.appointment = data
      if (this.appointment.appointmentStatus == 'CLOSED') {
        this.isClosed = true
      }
      if (this.appointment.appointmentStatus == 'CANCELLED') {
        this.isCancelled = true
      }
      console.log("ada" + this.appointment);
    },
      (error) => {
        console.log(error);
 
      })
    this.appointmentService.getAllVets().subscribe(data => {
      this.vets = data;
      console.log(data);
    })
  }
  updateSubmit(data: Appointment) {
    data.appointmentId = this.id
    this.appointmentService.editAppointment(this.appointment).subscribe(data => {
      alert("update is completed")
      console.log(data);
 
    },
      (error) => {
        // alert(error)
 
      });
 
    console.log(this.appointment.vetId = Number(this.doctorName));
  }
 
  goBack() {
    this.location.back()
  }
 
}