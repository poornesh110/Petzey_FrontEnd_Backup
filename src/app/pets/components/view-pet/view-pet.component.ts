import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { PetServiceService } from '../../service/pet-service.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Pet } from '../../models/pet';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { PetParent } from '../../models/pet_parent';

import { HeaderComponent } from '../../../shared/components/header/header.component';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({

  selector: 'app-view-pet',

  standalone: true,

  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet, RouterLink, HeaderComponent, HeaderComponent, SidebarComponent],

  templateUrl: './view-pet.component.html',

  styleUrl: './view-pet.component.css'

})

export class ViewPetComponent implements OnInit {


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

    petParent: new PetParent,

    petType: '',

    petBreed: '',

    petGender: '',

    petAge: 0,

    petBloodGroup: '',

    petDateOfBirth: ''

  }

  constructor(

    private petService: PetServiceService,

    private http: HttpClient,

    private route: ActivatedRoute,) {

  }


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