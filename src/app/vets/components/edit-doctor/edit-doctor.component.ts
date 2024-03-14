import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Clinic } from '../../../shared/models/clinic';
import { Vet } from '../../models/vet';
import { VetService } from '../../services/vet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ClinicService } from '../../../shared/services/clinic/clinic.service';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent {
  clinic = new Clinic()
  vetData = new Vet();

  role: string = ''
  userID: number = -1;

  constructor(private vetService: VetService, private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
      this.userID = params['id']
      console.log(this.role, this.userID)
    })
    // this.userID = this.route.snapshot.paramMap.get('id')
    this.getVet();
    this.getVetClinicDetails(this.userID);
  }

  getVet() {
    this.vetService.getVetDetails(this.userID).subscribe(data => this.vetData = data);
  }

  getVetClinicDetails(vetId: number) {
    this.clinicService.getClinicDetailsByVetId(this.userID).subscribe(data => this.clinic = data);
  }

  updateDetails() {
    this.vetService.editVetDetails(this.userID, this.vetData).subscribe(data => this.vetData = data);
    alert("Updated Successfully")
    this.router.navigate(['/dashboard']);
  }
}
