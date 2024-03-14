import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PetServiceService } from '../../../pets/service/pet-service.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-all-pets',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './all-pets.component.html',
  styleUrl: './all-pets.component.css',
})
export class AllPetsComponent {
  AllPets: any;
  vetId: any;
  role: any;
  petid: any;
  constructor(
    private petService: PetServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.vetId = params['id'];
      this.role = params['role'];
      this.petid = params['petId'];
    });
    this.petService.getPetList().subscribe((data) => (this.AllPets = data));
  }
}
