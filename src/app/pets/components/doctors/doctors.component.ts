import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Vet } from '../../../vets/models/vet';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent {
  constructor(private http: HttpClient) {
    this.getAllVets();
    this.getHighlyRated();

  }
  hide: boolean = false;

  togglebar() {
    this.hide = !this.hide;
  }
  AllVets: any;
  highlyRatedVets: any;

  getAllVets() {
    this.http
      .get(`${environment.vet}get`)
      .subscribe((res) => {
        this.AllVets = res;
        console.log(res);
      });
  }


  getHighlyRated() {
    console.log(this.highlyRatedVets);
    this.http
      .get(`${environment.vet}getHighlyRated`)
      .subscribe((res) => {
        this.highlyRatedVets = res;

        console.log(res);
      });
    // this.sortByRatings();
  }
  sortByRatings() {
    this.highlyRatedVets.sort((a: Vet, b: Vet) => b.rating - a.rating); // Sorting in descending order based on ratings
  }
}
