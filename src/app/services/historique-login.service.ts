import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriqueLogin } from '../models/historique-login';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueLoginService {

  public apiServerUrl = environment.apiBaseUrl;

  //public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-historiqueLogins/v1";

  constructor(private http: HttpClient) {
  }

  /*************************** HistoriqueLogin ********************/
  public getAllHistoriqueLogins(): Observable<HistoriqueLogin[]> {
    return this.http.get<HistoriqueLogin[]>(`${this.apiServerUrl}/historiqueLogins/all`);
  }

  public getHistoriqueLoginsOrderByIdDesc(): Observable<HistoriqueLogin[]> {
    return this.http.get<HistoriqueLogin[]>(`${this.apiServerUrl}/historiqueLogins/searchHistoriqueLoginByIdDesc`);
  }
  
  public getHistoriqueLoginById(idHistoriqueLogin: number): Observable<HistoriqueLogin> {
    return this.http.get<HistoriqueLogin>(`${this.apiServerUrl}/historiqueLogins/findById/${idHistoriqueLogin}`);
  }

  public addHistoriqueLogin(histLogin: HistoriqueLogin): Observable<HistoriqueLogin> {
    return this.http.post<HistoriqueLogin>(`${this.apiServerUrl}/historiqueLogins/create`, histLogin);
  }

  public updateHistoriqueLogin(idHistoriqueLogin: number, histLogin: HistoriqueLogin): Observable<HistoriqueLogin> {
    return this.http.put<HistoriqueLogin>(`${this.apiServerUrl}/historiqueLogins/update/${idHistoriqueLogin}`, histLogin);
  }

  public deleteHistoriqueLogin(idHistoriqueLogin: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/historiqueLogins/delete/${idHistoriqueLogin}`);
  }

  public countNumberOfhistoriqueLogins(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/historiqueLogins/NumbersOfHistoriqueLogins`);
  }

}
