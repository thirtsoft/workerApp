import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllLocaliteDTOs(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/localities/all`);
  }

  public getLocaliteDTOOrderByIdDesc(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/localities/searchAlllocalitiesOrderByIdDesc`);
  }

  public getLocaliteDTOOrderByAddressId(locId: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/localities/searchLocalityByAddressCode/${locId}`);
  }

  public getLocalityDTOById(locId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiServerUrl}/localities/findById/${locId}`);
  }

  public addLocalityDTO(localityDTO: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}/localities/create`, localityDTO);
  }

  public updateLocalityDTO(locId: number, localityDTO: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiServerUrl}/localities/update/${locId}`, localityDTO);
  }

  public deleteLocalityDTO(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/localities/delete/${noteId}`);
  }
}
