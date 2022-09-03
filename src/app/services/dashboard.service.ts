import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Annonce } from '../models/annonce';
import { Appointment } from '../models/appointment';
import { HistoriqueLogin } from '../models/historique-login';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  } 

  public countNumberOfOuvriers(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/NumbersOfOuvriers`);
  }

  public getNumbersOfOuvriersPeerMonth(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/numberOfOuvriersPeerMonth`);
  }
  
  public countNumbersOfOuvriersPeerYear(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/numberOfOuvriersPeerYear`);
  }
  
  public countNumberOfRecruteurs(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/NumbersOfRecruteurs`);
  }

  public getNumberOfRegisterPeerMonth(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/countNumberTotalOfRegisterPeerMonth`);
  }

  public getNumberOfRegisterPeerYear(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/countNumberTotalOfRegisterPeerYear`);
  }

  public getNumberOfPendingAppointments(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/appointments/numbersOfAppointmentsByStatusPending`);
  }

  public getTop10PendingAppointmentsOderByIdDesc(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchTop10PendingAppointmentsOrderByIdDesc`);
  } 

  public getTop30AppointmentsOderByIdDesc(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchTop30AppointmentsOrderByIdDesc`);
  }

  public getTop30RatingOrderByIdDesc(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchTop30RatingOrderByCreatedDateDesc`);
  }

  public getTop30HistoriqueLoginsOrderByIdDesc(): Observable<HistoriqueLogin[]> {
    return this.http.get<HistoriqueLogin[]>(`${this.apiServerUrl}/historiqueLogins/searchTop30HistoriqueLoginByIdDesc`);
  }
  
  public getNumberTotalOfAppointmentsInYear(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/appointments/numbersOfAcceptedAppointmentsInYear`);
  } 
  
  public countNumberOfAppointmentByCustomerId(userId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/appointments/countNumberOfAppointmentByCustomerId/${userId}`);
  }
  
  public countNumberOfAppointmentByOuvrierIdAndStatusAccepted(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/countNumberOfAppointmentByCustomerIdAndStatusAccepted/${userId}`);
  }
  
  public getNumbersOfAppointmentsPeerMonth(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/appointments/countNumberTotalOfAppointmentsPeerMonth`);
  }
  
  public getNumbersOfAppointmentsPeerYear(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/appointments/countNumberTotalOfAppointmentsPeerYear`);
  }
  
  public getAllAppointmentsByCustomerId(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByCustomerId/${userId}`);
  }

  public getSumTotalOfJetonsInYear(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/jetons/sumTotalOfJetonInYear`);
  }

  public getSumTotalOfJetonsPeerMonth(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/jetons/sumTotalOfJetonPeerMonth`);
  }

  public getSumTotalOfJetonsPeerYear(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/jetons/sumTotalOfJetonPeerYear`);
  }

  public countNumberOfRating(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/ratings/countNumberOfRatings`);
  }

  public countNumberOfNotificationByProductId(noteId: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiServerUrl}/notifications/countNumberOfNotificationByProductId/${noteId}`);
  }

  public countNumberOfEmails(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/emails/countNumberOfEmailInMonth`);
  } 

  public getAllRatingsByCustomerId(userId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchListRatingByCustomerId/${userId}`);
  }

}
