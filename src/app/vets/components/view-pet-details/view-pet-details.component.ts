import { Component } from '@angular/core';
import { PetServiceService } from '../../../pets/service/pet-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppointmentHistoryComponent } from '../appointment-history/appointment-history.component';

@Component({
  selector: 'app-view-pet-details',
  standalone: true,
  imports: [AppointmentHistoryComponent, RouterOutlet, RouterLink],
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
  petImage: any;

  petURL = environment.PetURL

  constructor(
    private petService: PetServiceService,
    private http: HttpClient,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.getParent(1);


    this.getParent(1);
    console.log("inside view pet")
    console.log(this.route.snapshot.queryParamMap.get('gender'));
    this.petImage = this.route.snapshot.queryParamMap.get('petImage');
    this.petname = this.route.snapshot.queryParamMap.get('petName');
    this.age = this.route.snapshot.queryParamMap.get('age');
    this.bloodgroup = this.route.snapshot.queryParamMap.get('bloodGroup');
    this.gender = this.route.snapshot.queryParamMap.get('gender');
    this.dateofbirth = this.route.snapshot.queryParamMap.get('dateOfBirth');
    this.imageURL = this.route.snapshot.queryParamMap.get('imageURL');



  }
  petparent: any = {
    petParentId: 1,
    petParentName: '',
    phoneNumber: '',
    gender: 'Mr',
    address: '',
    email: '',
    imageURL: ''
  };

  getParent(pid: number) {

    this.http
      .get(`${this.petURL}getParentByID/${pid}`)
      .subscribe((response: any) => {
        this.petparent = response;


      });

  }


  petinfo: any = {
    petId: 1,
    petName: "",
    breed: "",
    gender: "",
    age: 0,
    bloodGroup: "",
    dateOfBirth: new Date,
    allergies: '',
    petparent: this.petparent

  }
}
