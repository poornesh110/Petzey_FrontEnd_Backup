import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdControllerService {
  petOwnerId:number=0
  vetId:number=0

  setPetOwnerId(id:number){
    this.petOwnerId=id
  }
  getPetOwnerId():number{
    return this.petOwnerId
  }

  setVetId(id:number){
    this.vetId=id
  }

  getVetId():number{
    return this.vetId
  }
}
