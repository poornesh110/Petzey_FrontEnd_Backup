import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pet } from '../../../pets/models/pet';
import { PetServiceService } from '../../../pets/service/pet-service.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-pets',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink],
  templateUrl: './all-pets.component.html',
  styleUrl: './all-pets.component.css'
})
export class AllPetsComponent {

  AllPets: any
  constructor(private petService: PetServiceService) { }

  ngOnInit() {
    this.petService.getPetList().subscribe(data => this.AllPets = data)
  }
}
