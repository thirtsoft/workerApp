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

  public getLocaliteDTOs(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getLocaliteDTOOrderByIdDesc(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiServerUrl}/addresses/searchAddressOrderByIdDesc`);
  }

  public getLocalityDTOById(locId: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiServerUrl}/addresses/findById/${locId}`);
  }

  public addLocalityDTO(localityDTO: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}/addresses/create`, localityDTO);
  }

  public updateLocalityDTO(locId: number, localityDTO: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiServerUrl}/addresses/update/${locId}`, localityDTO);
  }

  public deleteLocalityDTO(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${noteId}`);
  }
}
