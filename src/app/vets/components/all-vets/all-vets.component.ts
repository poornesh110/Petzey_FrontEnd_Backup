import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Vet } from '../../models/vet';
import { VetService } from '../../services/vet.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-all-vets',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink , HeaderComponent],
  templateUrl: './all-vets.component.html',
  styleUrl: './all-vets.component.css'
})
export class AllVetsComponent {

  AllVets: Vet[] = []
  HighRatedVets: Vet[] = [];
  userId: number=-1;

  constructor(private vetService: VetService , private router:ActivatedRoute) { }

  ngOnInit() {

      this.router.queryParams.subscribe(params => {
        this.userId = params['id'];
      })

    this.vetService.getHighRatedVets().subscribe(vet => this.HighRatedVets = vet);
    this.vetService.getAllVets().subscribe(data => this.AllVets = data)
  }

  getVetDetails(id: number) {
    this.vetService.getVetDetails(id);
  }

  getAllVets() {
    this.vetService.getAllVets();
  }

  editVet(vet: Vet) {
    this.vetService.editVetDetails(this.userId, vet);
  }

  getAppointmentHistory(id: number) {
    this.vetService.getAppointmentHistory(id);
  }

  getRecentlyConsultedVets() {
    this.vetService.getRecentlyConsultedVets();
  }

  // getHighRatedVets(){
  //   this.vetService.getHighRatedVets().subscribe(data => this.highRatedVets = data);
  // }
}
