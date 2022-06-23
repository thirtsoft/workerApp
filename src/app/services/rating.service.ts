import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating } from '../models/rating';
import { TokenStorageService } from './auth/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public apiServerUrl = environment.apiBaseUrl;

//  public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-chauffeurs/v1";


  id: any;
  artId: any;

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService) {
  }

  /*********************** Rating *****************/
  public getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/notifications/all`);
  }

  public getTop3RatingOrderByCreatedDateDesc(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/notifications/searchTop3RatingOrderByCreatedDateDesc`);
  }

  public getTop4RatingByChauffeurIdOrderByCreatedDateDesc(chauffId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/notifications/searchTop4RatingOrderByCreatedDateDescByChauffeurId/${chauffId}`);
  }

  public getRatingById(noteId: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiServerUrl}/notifications/findById/${noteId}`);
  }

  public addRating(Rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/notifications/create`, Rating);
  }

  public addRatingToDriver(id: number, Rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/notifications/createWithChauffeur/${id}`, Rating);
  }

  public addRatingToChauffeur(notificationDTO: Rating, idChauff: number, id:number): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/notifications/createRatingToChauffeur?idChauff=${idChauff}&id=${id}`, notificationDTO);
  }

  public updateRating(noteId: number, Rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiServerUrl}/notifications/update/${noteId}`, Rating);
  }

  public deleteRating(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/notifications/delete/${noteId}`);
  }

  public getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }
}
