import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PetServiceService } from '../../service/pet-service.service';
import { vets } from '../../models/vetdata';
import { Vet } from '../../../vets/models/vet';
import { Clinic } from '../../../shared/models/clinic';

@Component({
  selector: 'app-vet-profile',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './vet-profile.component.html',
  styleUrl: './vet-profile.component.css',
})
export class VetProfileComponent {
  vet: Vet = {
    vetId: 0,
    vetName: '',
    mobileNo: '',
    email: '',
    speciality: '',
    rating: 0,
    subscribe: function (arg0: (data: any) => any): void {
      throw new Error('Function not implemented.');
    },
    imgUrl: '',
    clinic: new Clinic(),
    imageURL: '',
  };
  petParentId: any;
  vetId: any;
  constructor(
    private route: ActivatedRoute,
    private petservice: PetServiceService
  ) { }

  ngOnInit() {
    this.petParentId = this.route.snapshot.queryParamMap.get('petParentId');
    this.vetId = this.route.snapshot.queryParamMap.get('vetId');
    this.getVet(this.vetId)
  }

  getVet(vetid: number) {
    this.petservice.getVetById(vetid).subscribe((res: Vet) => {
      this.vet = res;

    });
  }
}
