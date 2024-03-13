import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Clinic } from '../../../shared/models/clinic';
import { Vet } from '../../models/vet';
import { VetService } from '../../services/vet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicService } from '../../../shared/services/clinic/clinic.service';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent {

  clinic = new Clinic()
  vetData = new Vet();

  vetId: any;

  constructor(private vetService: VetService, private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.vetId = this.route.snapshot.paramMap.get('id')
    this.getVet();
    this.getVetClinicDetails(this.vetId);
  }

  getVet() {
    this.vetService.getVetDetails(this.vetId).subscribe(data => this.vetData = data);
  }

  getVetClinicDetails(vetId: number) {
    this.clinicService.getClinicDetailsByVetId(vetId).subscribe(data => this.clinic = data);
  }

  updateDetails() {
    this.vetService.editVetDetails(this.vetId, this.vetData).subscribe(data => this.vetData = data);
    // this.vetService.updateClinicDetails(this.vetId, this.clinic).subscribe(data => this.clinic = data);
    alert("Updated Successfully")
    this.router.navigate(['/dashboard/profilevet']);
  }
}
