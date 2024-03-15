import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EditPetparentComponent } from '../edit-petparent/edit-petparent.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { PetServiceService } from '../../service/pet-service.service';
import { Pet } from '../../models/pet';
import { creds } from '../../../authentication/models/login';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-profilepage',
  standalone: true,
  templateUrl: './profilepage.component.html',
  styleUrl: './profilepage.component.css',
  imports: [
    FormsModule,
    CommonModule,
    EditPetparentComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
  ],
})
export class ProfilepageComponent implements OnInit {
  getallpets: any;
  petParentId = -1;
  petForm: FormGroup;
  petParentName: any;
  constructor(
    private petService: PetServiceService,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.petForm = this.fb.group({
      petName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z]*$'),
        ],
      ],
      petAge: ['', [Validators.required]],
      petspce: ['', [Validators.required]],
      petGender: ['', [Validators.required]],
      bloodgroup: ['', [Validators.required]],
      dateOfbirth: ['', Validators.required],
      Allergies: ['', Validators.required],
    });
  }

  petinfo: any = {
    petName: '',
    breed: '',
    gender: '',
    age: 0,
    bloodGroup: '',
    dateOfBirth: new Date(),
    allergies: '',
  };

  parentinfo: any = {
    petParentName: '',
    phoneNumber: '',
    address: '',
    gender: 'Mr',
    petParentId: 0,
  };

  showForm = false;
  pd: any;
  role: string = '';

  addPet() {
    this.petService.addPet(this.petParentId, this.petinfo).subscribe((res) => {
      console.log(this.petinfo);
      window.location.reload();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.petParentId = params['id'];
      this.role = params['role'];
      this.pd = params['petId'];
    });

    // this.get();
    this.getParent(this.petParentId);
    this.getPetBasedonParentId(this.petParentId);
    // this.pd = this.route.snapshot.paramMap.get('id');
    console.log('pd' + this.pd);
    console.log('pared' + this.petParentId);
  }

  get() {
    this.petService.getPetList().subscribe((res) => {
      console.log(res);
      this.getallpets = res;
    });
  }

  PetParent = {
    petParentId: this.petParentId,
    petParentName: '',
    phoneNumber: '',
    gender: 'Mr',
    address: '',
    email: '',
    imageURL: '',
  };

  getParent(pid: number) {
    this.petService.getParentbyId(pid).subscribe((response: any) => {
      this.PetParent = response;
    });
  }

  openForm() {
    this.showForm = true;

    this.putdata.petParentId = this.PetParent.petParentId;
    this.putdata.petParentName = this.PetParent.petParentName;
    this.putdata.phoneNumber = this.PetParent.phoneNumber;
    this.putdata.address = this.PetParent.address;
    this.putdata.gender = this.PetParent.gender;
    this.putdata.email = this.PetParent.email;
    this.putdata.imageURL = this.PetParent.imageURL;
  }

  closeForm() {
    this.showForm = false;
  }

  putdata = {
    petParentId: 0,
    petParentName: '',
    phoneNumber: '',
    address: '',
    gender: 'Mr',
    email: '',
    imageURL: '',
  };

  updatdePetparent(event: any) {
    console.log(this.putdata);
    if (confirm('Are you want to update this data')) {
      this.petService.updateParent(this.putdata).subscribe(() => {
        console.log(this.putdata);
        alert('update');
      });
    }
  }


  jdata: any = {
    petId: 0,
    petName: "",
    breed: '',
    gender: '',
    age: 0,
    bloodGroup: '',
    dateOfBirth: new Date(),
    allergis: '',
    imageURL: '',
    petParent: {
      petParentId: 0,
      petParentName: '',
      phoneNumber: '',
      gender: 'Mr',
      address: '',
      email: "",
      imageURL: ""
    },
  };



  updatefetch(id: number) {
    // const c = this.getpetsbasedonparentid.find((p: Pet) => {
    //   return p.petId == id;
    // });

    // this.jdata.petId = c.petId;
    // this.jdata.petName = c.petName;
    // this.jdata.breed = c.breed;
    // this.jdata.gender = c.gender;
    // this.jdata.age = c.age;
    // this.jdata.bloodGroup = c.bloodgroup;
    // this.jdata.dateOfBirth = c.dateOfBirth;
    // this.jdata.allergis = c.allergis;
    // this.jdata.imageURL = c.imageURL;
    // this.jdata.petParent.petParentId = this.petParentId;
    this.petService.getPetbyid(id).subscribe((res) => {
      console.log("inside fetch")
      console.log(res);
      this.jdata = res;

    });
  }
  updatdePet(event: any) {
    if (confirm('Do you want to update this data')) {
      console.log(this.jdata);
      this.petService.updatePet(this.jdata).subscribe(() => {
        console.log(this.jdata);
        alert('update');
        window.location.reload();
      });
    }
  }

  getpetsbasedonparentid: any;
  getPetBasedonParentId(parentId: number) {
    this.petService.getpetByParent(parentId).subscribe((response: any) => {
      this.getpetsbasedonparentid = response;
      console.log(this.getpetsbasedonparentid);
    });
  }

  newAge(): void {
    if (this.petinfo.dateOfBirth) {
      console.log(this.petinfo.dateOfBirth);
      const today = new Date();
      const birthDate = new Date(this.petinfo.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      console.log(age);

      this.jdata.age = age;
      console.log('j data ' + this.jdata.age);
      this.petinfo.age = age;
      console.log('pet info ' + this.petinfo.age);
    }
  }

  updateAge(): void {
    if (this.jdata.dateOfBirth) {
      console.log(this.jdata.dateOfBirth);
      const today = new Date();
      const birthDate = new Date(this.jdata.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      console.log(age);

      this.jdata.age = age;
      console.log('j data ' + this.jdata.age);
      this.petinfo.age = age;
      console.log('pet info ' + this.petinfo.age);
    }
  }

  getMaxDate() {
    return new Date().toISOString().split('T')[0];
  }
}
