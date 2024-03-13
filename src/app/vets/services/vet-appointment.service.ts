import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { Appointment } from '../../appointments/models/appointment';
import { Pet } from '../../pets/models/pet';
import { PetParent } from '../../pets/models/pet_parent';

@Injectable({
  providedIn: 'root'
})
export class VetAppointmentService {
  constructor(private http: HttpClient) { }
  status: boolean = false;
  appointmentvetid = environment.getAllapiUrl;
  pet5 = environment.PetURL;
  // appointmentdate = environment.appointmentdate;

  getAppointments(vetid: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.appointmentvetid}getallByVet/${vetid}`);

  }
  // getappointementsbydate(vetid: number, date: string): Observable<Appointment> {
  //   return this.http.get<Appointment>(this.appointmentvetid + vetid + '/' + date);
  // }
  getPetById(id: number): Observable<String> {
    return this.http.get<Pet>(`${this.pet5}get/${id}`).pipe(
      map((data) => {
        return data.petName;
      })
    )
  }
  getPetParentById(id: number): Observable<string> {
    return this.http.get<PetParent>(`${this.pet5}getParentByID/${id}`).pipe(
      map((data) => {
        return data.petParentName;
      })
    )
  }
}
