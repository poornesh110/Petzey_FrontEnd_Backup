import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VetAppointmentService } from '../../services/vet-appointment.service';
import { Pet } from '../../../pets/models/pet';
import { PetParent } from '../../../pets/models/pet_parent';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-appointment-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})
export class AppointmentHistoryComponent {
  posts: any;
  page: number = 1;
  count: number = 0;
  tablesize: number = 3;
  tablesizes: any = [4, 8, 12, 16, 20];
  items: any
  selectedDate: Date | null = null;
  vetid: number = 701;
  petsid: number = 901;
  pet: Pet = new Pet;
  petparent: PetParent = new PetParent;
  petname: String = '';
  petParentNames: String[] = [];
  petParentId: number = 2;
  petNames: String[] = [];
  appointmentDate: String = '2024-03-05';
  petparentlist: [] = [];
 
  constructor(public loginService: VetAppointmentService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.loginService.getAppointments(this.vetid).subscribe((results) => {
      this.items = results;
      console.log(this.items);
      this.posts = results;
      this.items.petid = this.petsid;
      this.items.petParentId = this.petParentId;
 
 
      this.items.forEach((app: { petParentId: number; }) => {
        this.loginService.getPetParentById(app.petParentId).subscribe((petParentName) => {
          // this.petParentNames[app.petParentId] = petParentName;
          this.petParentNames.push(petParentName);
          console.log(petParentName);
        });
      });
      console.log(this.petParentNames);
      this.items.forEach((apps: { petId: number; }) => {
        this.loginService.getPetById(apps.petId).subscribe((pName) => this.petNames.push(pName));
      });
      console.log(this.petNames);
    });
 
 
    // this.items.petparentname=
    // this.appointment.date=this.appointmentDate
 
 
    this.loginService.getPetById(this.petsid).subscribe((petName) => {
 
      console.log(petName);
      return petName;
    });
    this.loginService.getPetParentById(this.petParentId).subscribe((petParentName) => {
 
      console.log(petParentName);
      return petParentName;
    });
  }
}
 