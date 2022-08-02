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
    return this.http.get<HistoriqueAppointment[]>(`${this.apiServerUrl}/historiqueAppointments/all`);
  }

  public getHistoriqueAppointmentsOrderByIdDesc(): Observable<HistoriqueAppointment[]> {
    return this.http.get<HistoriqueAppointment[]>(`${this.apiServerUrl}/historiqueAppointments/searchAllHistoriqueAppointmentByIdDesc`);
  }
  
  public getHistoriqueAppointmentById(idHistoriqueAppointment: number): Observable<HistoriqueAppointment> {
    return this.http.get<HistoriqueAppointment>(`${this.apiServerUrl}/historiqueAppointments/findById/${idHistoriqueAppointment}`);
  }

  public addHistoriqueAppointment(histAnnonce: HistoriqueAppointment): Observable<HistoriqueAppointment> {
    return this.http.post<HistoriqueAppointment>(`${this.apiServerUrl}/historiqueAppointments/create`, histAnnonce);
  }

  public updateHistoriqueAppointment(idHistoriqueAppointment: number, histAnnonce: HistoriqueAppointment): Observable<HistoriqueAppointment> {
    return this.http.put<HistoriqueAppointment>(`${this.apiServerUrl}/historiqueAppointments/update/${idHistoriqueAppointment}`, histAnnonce);
  }

  public deleteHistoriqueAppointment(idHistoriqueAppointment: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/historiqueAppointments/delete/${idHistoriqueAppointment}`);
  }

}
