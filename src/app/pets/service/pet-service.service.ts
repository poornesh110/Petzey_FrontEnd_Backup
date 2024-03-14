import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';
import { environment } from '../../../environments/environment';
import { PetParent } from '../models/pet_parent';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Appointment } from '../../appointments/models/appointment';
import { Vet } from '../../vets/models/vet';
import { creds } from '../../authentication/models/login';

@Injectable({
  providedIn: 'root',
})
export class PetServiceService {
  c: creds = new creds();
  petparentId = this.c.userid;
  petURL = environment.PetURL;
  appointmenturl = environment.getAllapiUrl;
  veturl = environment.vet;
  constructor(private http: HttpClient) { }

  getHighlyRated() {
    return this.http.get(this.veturl + `getHighlyRated`);
  }
  getAllVets() {
    return this.http.get(this.veturl + `get`);
  }

  getpetByParent(parentId: number) {
    return this.http.get(this.petURL + `/getpetByParentId/${parentId}`);
  }
  addPet(parentId: number, newPet: any) {
    console.log('inside service add pet');
    console.log(newPet);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.petURL + `/postpet/1`, newPet);
  }

  public updatePet(PetData: any) {
    return this.http.put(this.petURL + `/Pet`, PetData);
  }

  public updateParent(PetParent: any) {
    return this.http.put(this.petURL + `/Petparent`, PetParent);
  }

  public getPetInfoById(petId: string) {
    return this.http.get(this.petURL);
  }

  public getParentbyId(id: number) {
    return this.http.get(this.petURL + `/getParentByID/${id}`);
  }

  getPetbyid(id: number): Observable<Pet> {
    return this.http.get<Pet>(this.petURL + `/get/${id}`);
  }

  getPetList(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.petURL}/getAll`);
  }

  public removePetz(PetData: Pet) {
    return this.http.delete(this.petURL + '/delete/' + PetData);
  }

  getAllAppointments(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      this.appointmenturl + `/getallAppointmentByParentId/${id}`
    );
  }

  getVetById(id: number): Observable<Vet> {
    return this.http.get(this.veturl + `${id}`).pipe(
      map((response) => response as Vet),
      catchError((error) => {
        console.error('Error fetching vet:', error);
        return throwError(error);
      })
    );
  }
}
