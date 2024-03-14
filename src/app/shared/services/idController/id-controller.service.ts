import { Injectable } from '@angular/core';
import { creds } from '../../../authentication/models/login';
import { ViewAppointmentsComponent } from '../../../appointments/components/view-appointments/view-appointments.component';
import { DashboardService } from '../../../appointments/services/dashboard_service/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class IdControllerService {
  petOwnerId:number=0
  vetId:number=0
  user:any

  constructor(private appointmentservice:DashboardService){}

  setPetOwnerId(id:number){
    this.petOwnerId=id
  }

  getPetOwnerId():number{
    return this.petOwnerId
  }

  currentUser(data:creds){
    this.user = data
    console.log(this.user)
   this.appointmentservice.currentuser(data);
  }

  returnuser(){
    console.log(this.user)
    return this.user
  }

  setVetId(id:number){
    this.vetId=id
  }

  getVetId():number{
    return this.vetId
  }
}
