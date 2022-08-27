import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locality } from '../models/Locality';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllLocaliteDTOs(): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.apiServerUrl}/localities/all`);
  }

  public getLocaliteDTOOrderByIdDesc(): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.apiServerUrl}/localities/searchAlllocalitiesOrderByIdDesc`);
  }

  public getLocaliteDTOOrderByLocalityId(locId: string): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.apiServerUrl}/localities/searchLocalityByLocalityCode/${locId}`);
  }

  public getLocalityDTOById(locId: number): Observable<Locality> {
    return this.http.get<Locality>(`${this.apiServerUrl}/localities/findById/${locId}`);
  }

  public addLocalityDTO(localityDTO: Locality): Observable<Locality> {
    return this.http.post<Locality>(`${this.apiServerUrl}/localities/create`, localityDTO);
  }

  public updateLocalityDTO(locId: number, localityDTO: Locality): Observable<Locality> {
    return this.http.put<Locality>(`${this.apiServerUrl}/localities/update/${locId}`, localityDTO);
  }

  public deleteLocalityDTO(noteId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/localities/delete/${noteId}`);
  }
}
