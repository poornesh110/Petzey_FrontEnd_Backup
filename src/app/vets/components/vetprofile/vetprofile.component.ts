import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Clinic } from '../../../shared/models/clinic';
import { Vet } from '../../models/vet';
import { ClinicService } from '../../../shared/services/clinic/clinic.service';
import { VetService } from '../../services/vet.service';

@Component({
  selector: 'app-vetprofile',
  standalone: true,
  templateUrl: './vetprofile.component.html',
  styleUrl: './vetprofile.component.css',
  imports: [RouterOutlet, RouterLink, CommonModule]
})
export class VetprofileComponent {
  id: any;

  clinic: Clinic = new Clinic()
  vet: Vet = new Vet()
  constructor(private vetService: VetService, private clinicService: ClinicService, private route: ActivatedRoute, private router: Router) {
    // console.log(this.route.snapshot.queryParamMap);

    this.id = this.route.snapshot.queryParamMap.get('id');

  }

  ngOnInit() {
    this.vetService.getVetDetails(701).subscribe(vetData => this.vet = vetData);
    this.clinicService.getClinicDetailsByVetId(701).subscribe(clin => this.clinic = clin);
  }
  // getVet() {
  //   this.vetService.getVetDetails(700).subscribe(data => this.vet = data);
  // }

  navigate() {
    this.router.navigate(['/dashboard/editVet', 701])
  }

  // updateDetails() {
  //   this.vetService.editVetDetails(701, this.vet).subscribe(data => this.vet = data);
  // }
}
