import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Newsletter } from '../models/newsletter';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm: FormGroup;

  constructor(private http: HttpClient) {
  }

  /*************************** Newsletter ********************/
  public getAllNewsletters(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.apiServerUrl}/newsletters/all`);
  }

  public getNewslettersOrderByIdDesc(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.apiServerUrl}/newsletters/searchAllNewsletersOrderByIdDesc`);
  }

  public getNewsletterById(idNewsleter: number): Observable<Newsletter> {
    return this.http.get<Newsletter>(`${this.apiServerUrl}/newsletters/findById/${idNewsleter}`);
  }

  public addNewsletter(newsletter: Newsletter): Observable<Newsletter> {
    return this.http.post<Newsletter>(`${this.apiServerUrl}/newsletters/create`, newsletter);
  }

  public updateNewsletter(idNewsleter: number, newsletter: Newsletter): Observable<Newsletter> {
    return this.http.put<Newsletter>(`${this.apiServerUrl}/newsletters/update/${idNewsleter}`, newsletter);
  }

  public deleteNewsletter(idNewsleter: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/newsletters/delete/${idNewsleter}`);
  }

  public countNumberOfNewsletters(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/newsletters/NumbersOfnewsletters`);
  }
}
