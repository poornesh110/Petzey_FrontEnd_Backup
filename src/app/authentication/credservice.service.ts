import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { creds } from './models/login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CredserviceService {
  constructor(private http: HttpClient) {}
  url = environment.CredURL;

  public getdetails(email: string): Observable<creds> {
    console.log('service is being called');
    return this.http.get<creds>(`${this.url}/${email}`);
  }
}
