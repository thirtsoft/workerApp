import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment';
import { TokenStorageService } from './auth/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  
  public apiServerUrl = environment.apiBaseUrl;

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";

  id: any;
  artId: any;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  /*********************** Appointment *****************/
  public getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/all`);
  }

  public getAllAppointmentOrderByIdDesc(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentOrderByIdDesc`);
  }

  public getAllAppointmentByStatusPending(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByStatusPending`);
  }

  public getAllAppointmentByStatusAccepted(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByStatusAccepted`);
  }

  public getAllAppointmentByStatusRefused(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByStatusRefused`);
  }

  public getAllAppointmentsByOuvrierId(ouvId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByOuvrierId/${ouvId}`);
  }

  public getAllAppointmentsByCustomerId(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByCustomerId/${userId}`);
  }

  public getTop4AppointmentByOuvrierIdOrderByCreatedDateDesc(ouvId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchTop4AppointmentsByOuvrierId/${ouvId}`);
  }

  public getAppointmentById(appId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiServerUrl}/appointments/findById/${appId}`);
  }

  public addAppointment(appoint: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiServerUrl}/appointments/create`, appoint);
  }

  public addAppointmentToOuvrier(appoint: Appointment, idOuv: number, id:number): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiServerUrl}/appointments/createAppointmentToOuvrier?idOuv=${idOuv}&id=${id}`, appoint);
  }

  public updateAppointment(appointId: number, appoint: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiServerUrl}/appointments/update/${appointId}`, appoint);
  }

  public updateStatusOfAppointment(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};
    const urlUpdateStatus = (this.apiServerUrl+"/appointments/updateStatusOfAppointment/"+id+"?status="+data.status);
    return this.http.patch<any>(urlUpdateStatus, {headers: headers});
  }

  public countNumberOfAppointments(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/numbersOfAppointments`);
  }

  public countNumberOfAppointmentInMonth(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/numbersOfAppointmentsInMonth`);
  }

  public countNumberOfAppointmentByStatusPending(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/numbersOfAppointmentsByStatusPending`);
  }

  public countNumberOfAppointmentByStatusAccepted(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/numbersOfAppointmentsByStatusAccepted`);
  }

  public countNumberOfAppointmentByOuvrierId(ouvId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/countNumberOfAppointmentByOuvrierId/${ouvId}`);
  }

  public countNumberTotalOfAppointmentPeerMonth(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/countNumberTotalOfAppointmentsPeerMonth`);
  }

  public countNumberTotalOfAppointmentPeerYear(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/countNumberTotalOfAppointmentsPeerYear`);
  }

  public deleteAppointment(appointId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/appointments/delete/${appointId}`);
  }

  public getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }

}
