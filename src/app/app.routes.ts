import { Routes } from '@angular/router';
import { ViewAppointmentsComponent } from './appointments/components/view-appointments/view-appointments.component';
import { AppointmentSummaryComponent } from './appointments/components/appointment-summary/appointment-summary.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { LogoutComponent } from './authentication/components/logout/logout.component';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/components/reset-password/reset-password.component';
import { NewChatComponent } from './chat/component/new-chat/new-chat.component';
import { NewAppointmentComponent } from './appointments/components/new-appointment/new-appointment.component';
import { ViewAppointmentDetailsComponent } from './appointments/components/view/view-appointment-details/view-appointment-details.component';
import { ViewAppointmentComponent } from './appointments/components/view/view-appointment/view-appointment.component';
import { ViewCommentsComponent } from './appointments/components/view/view-comments/view-comments.component';
import { ViewRecommendedClinicsComponent } from './appointments/components/view/view-recommended-clinics/view-recommended-clinics.component';
import { ViewRecommendedDoctorsComponent } from './appointments/components/view/view-recommended-doctors/view-recommended-doctors.component';
import { ViewVetComponent } from './appointments/components/view/view-vet/view-vet.component';
import { VitalsSymptomsComponent } from './appointments/components/view/view-vitals/view-vitals.component';
import { ViewPetParentComponent } from './pets/components/view-pet-parent/view-pet-parent.component';
import { BodyComponent } from './pets/components/body/body.component';
import { DoctorsComponent } from './pets/components/doctors/doctors.component';
import { ProfilepageComponent } from './pets/components/profilepage/profilepage.component';
import { VetProfileComponent } from './pets/components/vet-profile/vet-profile.component';
import { ViewPetComponent } from './pets/components/view-pet/view-pet.component';
import { AllPetsComponent } from './vets/components/all-pets/all-pets.component';
import { VetprofileComponent } from './vets/components/vetprofile/vetprofile.component';
import { EditDoctorComponent } from './vets/components/edit-doctor/edit-doctor.component';
import { AllVetsComponent } from './vets/components/all-vets/all-vets.component';
import { PetsNewappointComponent } from './pets/components/pets-newappoint/pets-newappoint.component';
import { ViewPetDetailsComponent } from './vets/components/view-pet-details/view-pet-details.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: '', loadComponent: () => import('./appointments/components/view-appointments/view-appointments.component').then((viewappointments) => viewappointments.ViewAppointmentsComponent) },
      // { path: '', redirectTo: 'view-appointments', pathMatch: 'full' }, // Default child route
      // {path:'',component:HeaderComponent},
      { path: 'view-appointments', loadComponent: () => import('./appointments/components/view-appointments/view-appointments.component').then((viewappointments) => viewappointments.ViewAppointmentsComponent) },
      { path: 'appointment-summary', component: AppointmentSummaryComponent },
      { path: 'allpets', component: AllPetsComponent },
      { path: 'profilevet', component: VetprofileComponent },
      { path: 'editVet', component: EditDoctorComponent },
      { path: 'allVets', component: AllVetsComponent },
      { path: 'newAppointment', component: NewAppointmentComponent },
      { path: 'petOwnerprofile', component: ProfilepageComponent },
      { path: 'doctor', component: DoctorsComponent },
      { path: 'vetprofile', component: VetProfileComponent },
      { path: 'viewpet', component: ViewPetComponent },
      { path: 'feedback/:appointmentId', component: ViewAppointmentsComponent },
      { path: 'newAppointmentbyPetOwner', component: PetsNewappointComponent }

    ],
  },

  {
    path: 'details',
    children: [
      { path: '', component: ViewAppointmentComponent },
      { path: 'details', component: ViewAppointmentDetailsComponent },
      // { path: 'prescription', component: PrescriptionsComponent },
      { path: 'comments', component: ViewCommentsComponent },
      { path: 'pet-parent', component: ViewPetParentComponent },
      {
        path: 'recommended-doctors',
        component: ViewRecommendedDoctorsComponent,
      },
      {
        path: 'recommended-clinics',
        component: ViewRecommendedClinicsComponent,
      },
      { path: 'vet', component: ViewVetComponent },
      { path: 'vitals', component: VitalsSymptomsComponent },
    ],
  },


  { path: 'vetpets', component: AllPetsComponent },
  { path: 'newAppointment', component: NewAppointmentComponent },
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'enter-email', component: ResetPasswordComponent },
  { path: 'chat/:userId', component: NewChatComponent },
  { path: 'view-appointments', component: ViewAppointmentsComponent },
  { path: 'view-pet-details', component: ViewPetDetailsComponent }

];
