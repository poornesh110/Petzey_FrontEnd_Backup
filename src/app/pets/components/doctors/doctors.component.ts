import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Vet } from '../../../vets/models/vet';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PetServiceService } from '../../service/pet-service.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, HeaderComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent {
  petParentId: any;
  role: any;
  vetId: any;
  constructor(private http: HttpClient, private petservice: PetServiceService, private route: ActivatedRoute) {


  }
  hide: boolean = false;

  ngOnInit() {
    this.getAllVets();
    this.getHighlyRated();
    this.route.queryParams.subscribe((params) => {
      this.petParentId = params['id'];
      this.role = params['role'];
      this.vetId = params['vetId'];
    });
  }
  togglebar() {
    this.hide = !this.hide;
  }
  AllVets: any;
  highlyRatedVets: any;

  getAllVets() {
    this.petservice.getAllVets().subscribe((res) => {
      this.AllVets = res;
      console.log(res);
    });
  }


  getHighlyRated() {
    console.log(this.highlyRatedVets);
    this.petservice.getHighlyRated().subscribe((res) => {
      this.highlyRatedVets = res;

      console.log(res);
    });
    // this.sortByRatings();
  }
  sortByRatings() {
    this.highlyRatedVets.sort((a: Vet, b: Vet) => b.rating - a.rating); // Sorting in descending order based on ratings
  }
}
