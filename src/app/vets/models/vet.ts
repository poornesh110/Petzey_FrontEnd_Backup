import { Clinic } from "../../shared/models/clinic";

export class Vet {
  subscribe(arg0: (data: any) => any) {
    throw new Error('Method not implemented.');
  }
  vetId: number = 0;
  vetName: String = '';
  mobileNo: string = '';
  email: string = '';
  speciality: string = '';
  rating: number = 0;
  imgUrl: string = '';
  clinic: Clinic = new Clinic();
  imageURL:string=''

}