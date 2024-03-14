import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Clinic } from '../../../shared/models/clinic';
import { Vet } from '../../models/vet';
import { ClinicService } from '../../../shared/services/clinic/clinic.service';
import { VetService } from '../../services/vet.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-vetprofile',
  standalone: true,
  templateUrl: './vetprofile.component.html',
  styleUrl: './vetprofile.component.css',
  imports: [RouterOutlet, RouterLink, CommonModule, HeaderComponent]
})
export class VetprofileComponent {
  id: any;

  clinic: Clinic = new Clinic()
  vet: Vet = new Vet()
  userId: number = -1;
  role: string = ''
  constructor(private vetService: VetService, private clinicService: ClinicService, private router: ActivatedRoute, private route: Router) {
    // console.log(this.route.snapshot.queryParamMap);

    // this.id = this.router.snapshot.queryParamMap.get('id');

  }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.role = params['role']
    })


    this.vetService.getVetDetails(this.userId).subscribe(vetData => this.vet = vetData);
    this.clinicService.getClinicDetailsByVetId(this.userId).subscribe(clin => this.clinic = clin);
  }
  // getVet() {
  //   this.vetService.getVetDetails(700).subscribe(data => this.vet = data);
  // }

  updateDetails() {
    this.vetService.editVetDetails(this.userId, this.vet).subscribe(data => this.vet = data);
  }

  // navigate() {
  //   this.route.navigate(['/dashboard/editVet', this.userId]);
  // }
}
