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
  public getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/all`);
  }

  public getAllRatingOrderByIdDesc(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchAllRatingsOrderByIdDesc`);
  }

  public getTop3RatingOrderByCreatedDateDesc(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchTop3RatingOrderByCreatedDateDesc`);
  }

  public getTop4RatingByChauffeurIdOrderByCreatedDateDesc(chauffId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiServerUrl}/ratings/searchTop4RatingOrderByCreatedDateDescByOuvrierId/${chauffId}`);
  }

  public getRatingById(noteId: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiServerUrl}/ratings/findById/${noteId}`);
  }

  public addRating(rat: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/ratings/create`, rat);
  }

  public addRatingToDriver(id: number, rat: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/ratings/createWithOuvrier/${id}`, rat);
  }

  public addRatingToChauffeur(rat: Rating, idChauff: number, id:number): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/ratings/createRatingToOuvrier?idChauff=${idChauff}&id=${id}`, rat);
  }

  public updateRating(noteId: number, rat: Rating): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiServerUrl}/ratings/update/${noteId}`, rat);
  }

  public countNumberOfRating(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/ratings/countNumberOfRatings`);
  }

  public countNumberOfRatingOfOuvriers(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/ratings/countNumberOfRatingByOuvrierId`);
  }

  public deleteRating(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ratings/delete/${noteId}`);
  }

  public getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }
}
