import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppointmentHistoryComponent } from '../appointment-history/appointment-history.component';
import { Pet } from '../../../pets/models/pet';
import { PetParent } from '../../../pets/models/pet_parent';
import { PetServiceService } from '../../../pets/service/pet-service.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-view-pet-details',
  standalone: true,
  imports: [AppointmentHistoryComponent, HeaderComponent],
  templateUrl: './view-pet-details.component.html',
  styleUrl: './view-pet-details.component.css'
})
export class ViewPetDetailsComponent {
  petname: any;
  age: any;
  bloodgroup: any;
  gender: any;
  dateofbirth: any;
  imageURL: any;
  petParentId: any;
  petId: any;

  pet: Pet = {
    petId: 0,
    petName: '',
    breed: '',
    gender: '',
    age: 0,
    bloodGroup: '',
    imageURL: '',
    dateOfBirth: new Date(),
    allergies: '',
    petParent: new PetParent(),
    petType: '',
    petBreed: '',
    petGender: '',
    petAge: 0,
    petBloodGroup: '',
    petDateOfBirth: '',
  };

  constructor(
    private petService: PetServiceService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.petParentId = this.route.snapshot.queryParamMap.get('petParentId');
    this.petId = this.route.snapshot.queryParamMap.get('petId');

    this.getPet(this.petId);
  }

  getPet(pid: number) {
    this.petService.getPetbyid(pid).subscribe((response: Pet) => {
      this.pet = response;
    });
  }
}
