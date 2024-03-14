import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard_service/dashboard.service';
import { CommonModule } from '@angular/common';
import { AppointmentSummary } from '../../models/appointment_summary';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-appointment-summary',
  standalone: true,
  imports: [CommonModule , HeaderComponent],
  templateUrl: './appointment-summary.component.html',
  styleUrl: './appointment-summary.component.css',
})
export class AppointmentSummaryComponent {
  count: AppointmentSummary = new AppointmentSummary();


  constructor(private service: DashboardService ,    private router:ActivatedRoute,
    ) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
    })
    
    this.getAppointmentSummary();
  }


  id: number = -1;

  getAppointmentSummary() {
    this.service.getAppointmentSummary(this.id).subscribe((data) => {
      this.count = data;
      console.log(this.count);
    });
  }
}
