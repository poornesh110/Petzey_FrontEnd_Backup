import { Injectable } from '@angular/core';
import { AppointmentSummary } from '../../models/appointment_summary';
import { Appointment } from '../../models/appointment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { FeedbackFormModel } from '../../models/feedback';
import { Vet } from '../../../vets/models/vet';
import { Pet } from '../../../pets/models/pet';
import { PetParent } from '../../../pets/models/pet_parent';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  url = environment.domain;
  vetUrl = environment.vetdomain;
  petUrl = environment.petdomain;

  currentuser(data: any) {
    return data
  }

  getAppointmentSummary(id: number): Observable<AppointmentSummary> {
    return this.http.get<AppointmentSummary>(`${this.url}summary/${id}`)
  }

  getAllAppointments(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.url}` + "getallByVet/" + id)
  }

  getAllAppointmentsbypetId(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.url}` + "getallAppointmentByParentId/" + id)
  }

  getAppointmentbyFilterbyvetID(id: number, status: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.url}getstatusbyvet/${id}/${status}`)
  }

  getAppointmentbyFilterBypetParentID(id: number, status: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.url}getstatusbypet/${id}/${status}`)
  }

  submitFeedback(userid: number, feedbackData: FeedbackFormModel): Observable<any> {
    return this.http.post<any>(`${this.url}feedback/${userid}`, feedbackData);
  }

  getvetdetails(id: number): Observable<Vet> {
    return this.http.get<Vet>(`${this.vetUrl}/vet/${id}`);
  }

  getpetdetails(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.petUrl}/get/${id}`);
  }

  getPetparentdetails(id: number): Observable<PetParent[]> {
    return this.http.get<PetParent[]>(`${this.petUrl}/getpetByParentId/${id}`)
  }


}