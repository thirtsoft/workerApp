import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from '../models/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }
 
  /************************  Ville ****************/
  public getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(`${this.apiServerUrl}/villes/all`);
  }

  public getVilleById(villeId: number): Observable<Ville> {
    return this.http.get<Ville>(`${this.apiServerUrl}/villes/${villeId}`);
  }

  public addVille(Ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(`${this.apiServerUrl}/villes/create`, Ville);
  }

  public updateVille(villeId: number, Ville: Ville): Observable<Ville> {
    return this.http.put<Ville>(`${this.apiServerUrl}/villes/update/${villeId}`, Ville);
  }

  public deleteVille(villeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/villes/delete/${villeId}`);
  }
}
