import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ouvrier } from '../models/ouvrier';

@Injectable({
  providedIn: 'root'
})
export class OuvrierService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm:  FormGroup;

  //public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-ouvriers/v1";

  constructor(private http: HttpClient) {
  }
  /*************************** Ouvrier ********************/
  public getAllOuvriers(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/all`);
  }

  public getOuvrierOrderByIdDesc(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchOuvrierOrderByIdDesc`);
  }

  public getAllOuvrierBySelectedIsTrue(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchOuvrierBySelectedIsTrue`);
  }

  public getOuvrierById(chauffId: number): Observable<Ouvrier> {
    return this.http.get<Ouvrier>(`${this.apiServerUrl}/ouvriers/findById/${chauffId}`);
  }

  createFav(params) {
    return this.http.post(this.apiServerUrl + 'favourites', params);
  }

  public addOuvrier(ouv: Ouvrier): Observable<Ouvrier> {
    return this.http.post<Ouvrier>(`${this.apiServerUrl}/ouvriers/create`, ouv);
  }

  public addOuvrierWithFiles(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/createWithFiles`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);

  }

  public updateOuvrier(chauffId: number, ouv: Ouvrier): Observable<Ouvrier> {
    return this.http.put<Ouvrier>(`${this.apiServerUrl}/ouvriers/update/${chauffId}`, ouv);
  }

  public deleteOuvrier(chauffId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ouvriers/delete/${chauffId}`);
  }

  public getListOuvrierByPageable(page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchChauffeurByPageables?page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierBySelectedIsTrue(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchOuvrierBySelectedIsTrue`);
  }

  public getListOuvrierByKeyword(keyword: string): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchListOfOuvrierByKeyword?keyword=`+keyword);
  }

  public getListOuvrierByDisponibility(disponility: string): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchChauffeurByDisponibilite?disponible=`+disponility);
  }

  public getListOuvrierByKeywordPageable(mc: string, page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchListOfOuvrierByDisponibility?id="+mc+"&page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierByPermisPageable(permisId: number, page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchOuvrierByMetierPageables?id="+permisId+"&page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierByLocalityPageable(locId: number, page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchOuvrierByLocalityPageables?id="+locId+"&page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierByPermis(pId: number): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchListOfOuvrierByMetier/${pId}`);
  }

  public uploadPhotoOuvrier(filePhoto: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', filePhoto);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadOuvrierPhoto/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public getPhotoOuvrier() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/photoOuvrier`);
  }

  public uploadCvOuvrier(fileCV: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', fileCV);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadOuvrierCv/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public getCvChauffeur() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/cvOuvrier`);
  }

  public countNumberOfOuvriers(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/NumbersOfOuvriers`);
  }

  public getAllOuvriersByPageables(page,size): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/allOuvriers?page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  public getOuvriersByAddressId(id,page,size): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/address?id=${id}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  public getOuvriersByKey(word,page,size): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(this.apiServerUrl+"/ouvriers/Ouvrierkey?disponibility="+word+"&page="+page+"&size="+size).pipe(
      map(
        response => response
      )
    )
  }

  public getOuvriersLength(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/OuvrierDtoSize`).pipe(
      map(
        response => response
      )
    )
  }

  public getOuvriersLengthByAddressId(id): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/ctaddressIdSize?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }

  public getOuvriersLengthByMetierId(id): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/ctaddressIdSize?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }

  public getOuvriersLengthByKey(word): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/keySize?disponibility=${word}`).pipe(
      map(
        response => response
      )
    )
  }

  public addOuvrierWithPhotoAndCvFileInFolder(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/createWithFilesInFolder/`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public uploadPhotoOfChauffeurInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadPhotoOfOuvrierInFolder/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getPhotoChauffeurInContext() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/photoOuvrierInFolder`);
  }

  public uploadCvOfChauffeurInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadPhotoOfOuvrierInFolder/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getCvOfChauffeurFromContext() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/cvOuvrierInFolder`);
  }

  public downloadCvOfChauffeurFromFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/ouvriers/downloadCvFileOfOuvrier/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
