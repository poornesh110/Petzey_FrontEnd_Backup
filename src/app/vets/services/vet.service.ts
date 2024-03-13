import { Injectable } from '@angular/core';
import { Vet } from '../models/vet';
import { Appointment } from '../../appointments/models/appointments';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Clinic } from '../../shared/models/clinic';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  vets: Vet[] = [];

  appointment: Appointment = new Appointment;

  vetDetails: Vet = new Vet();


  vetsApi: string = environment.vet
  clinicApi: string = environment.clinic
  appointmentApi: string = environment.domain
  constructor(private http: HttpClient) { }

  getAllVets(): Observable<Vet[]> {
    return this.http.get<Vet[]>(`${this.vetsApi}get`)
  }

  getClinicByVetId(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.clinicApi}/${id}`);
  }

  getVetDetails(id: number): Observable<Vet> {

    return this.http.get<Vet>(`${this.vetsApi}${id}`);
  }

  getRecentlyConsultedVets() {
    //1. call backend apis
    //2. store the data recieved in vets object

    //3. return the vets object
    return null;
  }

  getHighRatedVets(): Observable<Vet[]> {
    //1. call backend apis
    const a = this.http.get<Vet[]>(`${this.vetsApi}getHighlyRated`);

    //2. store the data recieved in vets object

    //3. return the vets object
    return a;
  }

  editVetDetails(id: number, vet: Vet) {
    return this.http.put<Vet>(`${this.vetsApi}put/${id}`, vet)
  }

  getAppointmentHistory(vetId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.appointmentApi}/getallByVet/${vetId}`)
  }

  updateClinicDetails(vetId: number, clinic: Clinic) {
    return this.http.post(`${this.vetsApi}`, clinic);
  }

}
