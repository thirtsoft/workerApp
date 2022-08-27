import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriqueAppointment } from '../models/historique-appointment';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueAppointmentService {
  
  public apiServerUrl = environment.apiBaseUrl;

  //public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-HistoriqueAppointments/v1";

  constructor(private http: HttpClient) {
  }

  /*************************** HistoriqueAppointment ********************/
  public getAllHistoriqueAppointments(): Observable<HistoriqueAppointment[]> {
    return this.http.get<HistoriqueAppointment[]>(`${this.apiServerUrl}/historiqueAppointment/all`);
  }

  public getHistoriqueAppointmentsOrderByIdDesc(): Observable<HistoriqueAppointment[]> {
    return this.http.get<HistoriqueAppointment[]>(`${this.apiServerUrl}/historiqueAppointment/searchAllHistoriqueAppointmentByIdDesc`);
  }
  
  public getHistoriqueAppointmentById(idHistoriqueAppointment: number): Observable<HistoriqueAppointment> {
    return this.http.get<HistoriqueAppointment>(`${this.apiServerUrl}/historiqueAppointment/findById/${idHistoriqueAppointment}`);
  }

  public addHistoriqueAppointment(histAnnonce: HistoriqueAppointment): Observable<HistoriqueAppointment> {
    return this.http.post<HistoriqueAppointment>(`${this.apiServerUrl}/historiqueAppointment/create`, histAnnonce);
  }

  public updateHistoriqueAppointment(idHistoriqueAppointment: number, histAnnonce: HistoriqueAppointment): Observable<HistoriqueAppointment> {
    return this.http.put<HistoriqueAppointment>(`${this.apiServerUrl}/historiqueAppointment/update/${idHistoriqueAppointment}`, histAnnonce);
  }

  public deleteHistoriqueAppointment(idHistoriqueAppointment: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/historiqueAppointment/delete/${idHistoriqueAppointment}`);
  }

}
