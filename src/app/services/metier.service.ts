import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Metier } from '../models/metier';

@Injectable({
  providedIn: 'root'
})
export class MetierService {

  public apiServerUrl = environment.apiBaseUrl;

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  constructor(private http: HttpClient) {
  }

  /************************  Metier ****************/
  public getMetiers(): Observable<Metier[]> {
    return this.http.get<Metier[]>(`${this.apiServerUrl}/metiers/all`);
  }

  public getMetierOrderByIdDesc(): Observable<Metier[]> {
    return this.http.get<Metier[]>(`${this.apiServerUrl}/metiers/searchMetiersOrderByIdDesc`);
  }

  public getMetierById(metiersId: number): Observable<Metier> {
    return this.http.get<Metier>(`${this.apiServerUrl}/metiers/findById/${metiersId}`);
  }

  public addMetier(metier: Metier): Observable<Metier> {
    return this.http.post<Metier>(`${this.apiServerUrl}/metiers/create`, metier);
  }

  public updateMetier(metiersId: number, metier: Metier): Observable<Metier> {
    return this.http.put<Metier>(`${this.apiServerUrl}/metiers/update/${metiersId}`, metier);
  }

  public getNumberOfMetier(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/metiers/NumbersOfmetiers`);
  }

  public deleteMetier(metiersId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/metiers/delete/${metiersId}`);
  }

}
