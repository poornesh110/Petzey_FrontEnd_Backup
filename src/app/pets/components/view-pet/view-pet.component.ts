
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
  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet, RouterLink , HeaderComponent,HeaderComponent,SidebarComponent] ,
  templateUrl: './view-pet.component.html',
  styleUrl: './view-pet.component.css'
})
export class ViewPetComponent implements OnInit {
 
 
 
  petname :any;
  age : any;
  bloodgroup: any;
  gender: any;
  dateofbirth: any;
  imageURL:any;
  petParentId: any;
 
   constructor(
    private petService:PetServiceService,
    private http:HttpClient,
    private route: ActivatedRoute,){
   }
 
 
   ngOnInit() {  
   
 
 this.petParentId=this.route.snapshot.queryParamMap.get('petParentId');
 
 
    this.getParent(this.petParentId);
 
   
    this.getParent(this.petParentId);
    console.log("inside view pet")
    console.log(this.route.snapshot.queryParamMap.get('gender'));
    this.petname = this.route.snapshot.queryParamMap.get('petName');
    this.age = this.route.snapshot.queryParamMap.get('age');
    this.bloodgroup = this.route.snapshot.queryParamMap.get('bloodGroup');
    this.gender = this.route.snapshot.queryParamMap.get('gender');
    this.dateofbirth = this.route.snapshot.queryParamMap.get('dateOfBirth');
    this.imageURL = this.route.snapshot.queryParamMap.get('imageURL');
 
   
 
  }
   petparent: any= {
     petParentId: 1,
     petParentName: '',
     phoneNumber: '',
     gender: 'Mr',
     address: '',
     email:'',
     imageURL:''
   };
 
  getParent(pid: number) {
   
   this.petService.getParentbyId(pid).subscribe((response: any) => {
        this.petparent = response;
 
       
      });
     
  }
 
 
   petinfo:any={
    petId: 1,
     petName: "",
     breed: "",
     gender: "",
     age: 0,
     bloodGroup: "",
     dateOfBirth: new Date,
     allergies:'',
     petparent:this.petparent
   
   }

 
 }
 
 
 
 
 
 
 
 