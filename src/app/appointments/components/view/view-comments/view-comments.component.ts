import { Component } from '@angular/core';
import { AppointmentService } from '../../../services/appointment-service';
import { Appointment } from '../../../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../services/dashboard_service/dashboard.service';

@Component({
  selector: 'app-view-comments',
  standalone: true,
  imports: [],
  templateUrl: './view-comments.component.html',
  styleUrl: './view-comments.component.css'
})
export class ViewCommentsComponent {
  comment:string=''
  role: any;
  userID: any;
  userName: String ='';
  image: string ='';
  constructor(private appointmentService: AppointmentService,private rt:ActivatedRoute , private service :DashboardService) {

  }

  appointmentdetails: Appointment = new Appointment;
  id:number=0;

  ngOnInit() {
    this.rt.queryParams.subscribe(params => {
      this.role = params['role'];
      this.userID = params['id']
      console.log(this.role, this.userID)
    })

    
    this.rt.queryParams.subscribe(params => {
      this.id = params['data'];
    })
    this.appointmentService.getAppointmentDetails(this.id).subscribe(data => {
      this.appointmentdetails = data
      this.comment=this.appointmentdetails.appointmentReport.comments
      
    })

    this.getUser()
  }
  getUser() {
    try {
      if (this.role == 'Vet') {
        try {
          this.service.getvetdetails(this.userID).subscribe((data) => {
            this.userName = data.vetName;
            this.image = data.imageURL
            return data.vetName;
          });
        } catch (error) {
          console.log(error);
        }
      }
      if (this.role == 'PetOwner') {
        console.log('called')
        this.service.getPetparentdetails(this.userID).subscribe((data) => {
          console.log(data[0])
          this.userName = data[0].petParent.petParentName;
          this.image = data[0].petParent.imageURL;
          return data[0].petParent.petParentName;
        });
      }
    } catch (error) {
      console.log(error);

    }
    console.log(this.userName)
  }

}
