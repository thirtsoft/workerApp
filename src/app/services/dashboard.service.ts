import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Annonce } from '../models/annonce';
import { Appointment } from '../models/appointment';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public countNumberOfAnnonces(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/annonces/NumbersOfAnnonces`);
  }

  public countNumberOfAnnonceByStatusPending(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/annonces/NumbersOfAnnonceByStatusPending`);
  }

  public countNumberOfAnnonceByStatusValidated(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/annonces/NumbersOfAnnonceByStatusValidated`);
  }

  public countNumberOfAnnonceByInMonth(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/annonces/NumbersOfAnnonceInMonth`);
  }
  public countNumberOfAnnoncesInYear(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/annonces/NumbersOfAnnonceInYear`);
  }

  public countNumbersOfAnnoncePeerMonth(): Observable<Annonce[]>  {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/numberOfAnnonceByMonth`);
  }

  public countNumbersOfAnnoncePeerYear(): Observable<Annonce[]>  {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/numberOfAnnonceByYear`);
  }

  public countNumberOfReservationByStatusPending(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/reservations/NumbersOfReservationByStatusPending`);
  }

  public countNumbersOfReservationInYear(): Observable<any>  {
    return this.http.get(`${this.apiServerUrl}/reservations/NumbersOfReservationInYear`);
  } 

  public countNumberOfOuvriers(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/NumbersOfOuvriers`);
  }

  public countNumberOfAppointmentByCustomerId(userId: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/appointments/countNumberOfAppointmentByCustomerId/${userId}`);
  }

  public countNumberOfAppointmentByOuvrierIdAndStatusAccepted(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/appointments/countNumberOfAppointmentByCustomerIdAndStatusAccepted/${userId}`);
  }

  public countNumbersOfOuvriersPeerMonth(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/numberOfOuvriersPeerMonth`);
  }

  public countNumbersOfOuvriersPeerYear(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/numberOfOuvrierPeerYee`);
  }

  public countNumberOfRecruteurs(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/utilisateurs/NumbersOfRecruteurs`);
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

  public getAllAppointmentsByCustomerId(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiServerUrl}/appointments/searchAllAppointmentsByCustomerId/${userId}`);
  }

  public getAllRatingsByCustomerId(userId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchListRatingByCustomerId/${userId}`);
  }

}
