import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jeton } from '../models/jeton';

@Injectable({
  providedIn: 'root'
})
export class JetonService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  formData: FormGroup;
  listData : Jeton[];

  constructor(private http: HttpClient) {
  }

  /*************************** Jeton ********************/
  public getAllJetons(): Observable<Jeton[]> {
    return this.http.get<Jeton[]>(`${this.apiServerUrl}/jetons/all`);
  }

  public getJetonsOrderByIdDesc(): Observable<Jeton[]> {
    return this.http.get<Jeton[]>(`${this.apiServerUrl}/jetons/searchJetonsByIdDesc`);
  }

  public getJetonsByCustomerIdByIdDesc(userId: number): Observable<Jeton[]> {
    return this.http.get<Jeton[]>(`${this.apiServerUrl}/jetons/searchJetonsByCustomerId/${userId}`);
  }

  public getJetonById(idJeton: number): Observable<Jeton> {
    return this.http.get<Jeton>(`${this.apiServerUrl}/jetons/findById/${idJeton}`);
  }

  public addJeton(jeton: Jeton): Observable<Jeton> {
    return this.http.post<Jeton>(`${this.apiServerUrl}/jetons/create`, jeton);
  }

  public updateJeton(idJeton: number, jeton: Jeton): Observable<Jeton> {
 //   return this.http.put<Jeton>(`${this.apiServerUrl}/jetons/update/${idJeton}`, jeton);
    return this.http.patch<Jeton>(`${this.apiServerUrl}/jetons/update/${idJeton}`, jeton);
  }

  public updateEtatOfJeton(id: number, etat: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"etat":etat};
    const urlUpdateEtat = (this.apiServerUrl+"/jetons/updateEtatOfJeton/"+id+"?etat="+data.etat);
    return this.http.patch<any>(urlUpdateEtat, {headers: headers});
  }

  public deleteJeton(idJeton: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/jetons/delete/${idJeton}`);
  }

  public countNumberOfJetons(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/jetons/NumbersOfJetons`);
  }


}
