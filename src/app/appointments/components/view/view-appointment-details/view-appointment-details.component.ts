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



  isClosed: boolean = false
  isCancelled: boolean = false
  isAppointmentClosable = false
  id: number = 0
  role: string = '';
  constructor(
    private appointmentService: AppointmentService,
    private rt: ActivatedRoute,
    private location: Location) { }


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
    console.log(this.id);
    try {
      this.appointmentService.cancel_appointment(this.id).subscribe(data => {
        // console.log(data);
        // let errorDiv=document.getElementById('exampleModal3');
        // console.log(errorDiv);
        alert('Appointment with Id  ' + this.id + " cancelled succesfully")
      })
    } catch (error) {
      alert('Appointment with Id  ' + this.id + " cancelled succesfully")
      // let errorDiv=document.getElementById('exampleModal3');
      // console.log(errorDiv);
      // console.log(error);



    }
  }
  // closeSubmit() {
  //   try {
  //     this.appointmentService.close_appointment(this.id).subscribe(data => {
  //       alert("Appointment with Id  " + this.id + " closed succesfully")
  //     })
  //   }
  //   catch (error) {
  //     alert("Appointment with Id  " + this.id + " closed succesfully")
  //   }
  //   // this.appointmentService.close_appointment(this.id).subscribe(
  //   //   response =>{
  //   //    // console.log('Closed Successfully', response)
  //   //     alert('Appointment with Id  '+this.id+" closed succesfully")
  //   //   } ,
  //   //   error => {
  //   //     alert('Appointment with Id  '+this.id+" closed succesfully")
  //   //   }
  //   // );
  // }

  closeSubmit() {
    try {
      const appointmentDate = new Date(this.appointment.appointmentDate);
      const currentDate = new Date();

      if (appointmentDate > currentDate) {
        alert("Cannot close a future appointment");
        return;
      }
      this.appointmentService.close_appointment(this.id).subscribe(data => {
        alert("Appointment with Id  " + this.id + " closed successfully");
      });
    } catch (error) {
      alert("Error occurred while closing the appointment: ");
    }
  }



  vets: Vet[] = []
  doctorName: string = ''
  appointment: Appointment = new Appointment
  formatDate(date: Date): Date {

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  ngOnInit(): void {
    this.rt.queryParams.subscribe(params => {
      this.id = params['data'];
      this.role = params['role'];
    })
    console.log("Appointment Id", this.id);

    this.appointmentService.getAppointmentDetails(this.id).subscribe(data => {
      this.appointment = data
      let currentDate = this.formatDate(new Date());
      console.log(currentDate);

      let castingDate = new Date(this.appointment.appointmentDate);
      let appDate = this.formatDate(castingDate);
      console.log(appDate);
      if (appDate <= currentDate) {
        this.isAppointmentClosable = true
      }
      console.log(this.isAppointmentClosable);

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
