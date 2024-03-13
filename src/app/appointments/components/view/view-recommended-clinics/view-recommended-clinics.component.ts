import { Component } from '@angular/core';
import { AppointmentService } from '../../../services/appointment-service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../../../models/appointment';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-view-recommended-clinics',
  standalone: true,
  imports: [NgFor],
  templateUrl: './view-recommended-clinics.component.html',
  styleUrl: './view-recommended-clinics.component.css'
})
export class ViewRecommendedClinicsComponent {
  constructor(private service: AppointmentService, private rt: ActivatedRoute) {

  }
  id: number = 0;
  appointment: Appointment = new Appointment
  clinics: string[] = []

  ngOnInit() {
    this.rt.queryParams.subscribe(params => {
      this.id = params['data'];
      this.service.getAppointmentDetails(this.id).subscribe(data => {
        this.appointment = data;
        this.clinics = this.appointment.appointmentReport.recommendedClinics

      })
    })
  }

}
