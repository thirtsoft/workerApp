import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceOffert } from '../models/service-offert';

@Injectable({
  providedIn: 'root'
})
export class ServiceOffertService {

  public apiServerUrl = environment.apiBaseUrl;

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  id: any;
  artId: any;

  constructor(private http: HttpClient) {
  }

  /*********************** ServiceOffert *****************/
  public getAllServiceOfferts(): Observable<ServiceOffert[]> {
    return this.http.get<ServiceOffert[]>(`${this.apiServerUrl}/serviceOfferts/all`);
  }

  public getAllServiceOffertOrderByIdDesc(): Observable<ServiceOffert[]> {
    return this.http.get<ServiceOffert[]>(`${this.apiServerUrl}/serviceOfferts/searchAllServiceOffertsOrderByIdDesc`);
  }

  public getAllServiceOffertsByOuvrierId(ouvId: number): Observable<ServiceOffert[]> {
    return this.http.get<ServiceOffert[]>(`${this.apiServerUrl}/serviceOfferts/searchAllServiceOffertsByOuvrierId/${ouvId}`);
  }

  public getServiceOffertById(servId: number): Observable<ServiceOffert> {
    return this.http.get<ServiceOffert>(`${this.apiServerUrl}/serviceOfferts/findById/${servId}`);
  }

  public addServiceOffert(serviceOff: ServiceOffert): Observable<ServiceOffert> {
    return this.http.post<ServiceOffert>(`${this.apiServerUrl}/serviceOfferts/create`, serviceOff);
  }

  public updateServiceOffert(servId: number, serviceOff: ServiceOffert): Observable<ServiceOffert> {
    return this.http.put<ServiceOffert>(`${this.apiServerUrl}/serviceOfferts/update/${servId}`, serviceOff);
  }

  public deleteServiceOffert(appointId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/serviceOfferts/delete/${appointId}`);
  }

}
