import { PetParent } from "./pet_parent"

export class Pet{
    petId:number = 0;
    petName: string = "";
    breed: string = "";
    gender: string = "";
    age:number= 0;
    bloodGroup: string = "";
    imageURL:string ="";
    dateOfBirth: Date = new Date();
    allergies:string = "";
    petParent: PetParent = new PetParent;
    petType: string="";
    petBreed: string="";
    petGender: string="";
    petAge: number=0;
    petBloodGroup: string="";
    petDateOfBirth: string="";
   
  }