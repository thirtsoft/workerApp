import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prestation } from '../models/prestation';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  public apiServerUrl = environment.apiBaseUrl;

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  id: any;
  artId: any;

  constructor(private http: HttpClient) {
  }

  /*********************** Prestation *****************/
  public getAllPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.apiServerUrl}/prestations/all`);
  }

  public getAllPrestationOrderByIdDesc(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.apiServerUrl}/prestations/searchAllPrestationOrderByIdDesc`);
  }

  public getAllPrestationsByOuvrierId(ouvId: number): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.apiServerUrl}/prestations/searchAllPrestationsByOuvrierId/${ouvId}`);
  }

  public getTop4PrestationByOuvrierIdOrderByCreatedDateDesc(ouvId: number): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.apiServerUrl}/prestations/searchTop4prestationsByOuvrierId/${ouvId}`);
  }

  public getPrestationById(presId: number): Observable<Prestation> {
    return this.http.get<Prestation>(`${this.apiServerUrl}/prestations/findById/${presId}`);
  }

  public addPrestation(prest: Prestation): Observable<Prestation> {
    return this.http.post<Prestation>(`${this.apiServerUrl}/prestations/create`, prest);
  }

  public updatePrestation(prestId: number, prest: Prestation): Observable<Prestation> {
    return this.http.put<Prestation>(`${this.apiServerUrl}/prestations/update/${prestId}`, prest);
  }

  public countNumberOfPrestationByOuvrierId(ouvId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/prestations/countNumberOfPrestationByOuvrierId/${ouvId}`);
  }

  public deletePrestation(appointId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/prestations/delete/${appointId}`);
  }


}
