import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Filterbag, textValue, configModel } from '../interfaces/shared';
import {regCvretGiacenza } from '../interfaces/models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //rxjs qui sta lavorando in compatibilità

  private headers = new Headers({ 'Content-Type': 'application/json' }); 0
  _baseUrl: string = '';

  // For Using Fake API by Using It's URL
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this._baseUrl = baseUrl; // "https://jsonplaceholder.typicode.com/";
  }


  public Get_RegCvretGiacenza(selection): Observable<regCvretGiacenza[]> {

    const params: HttpParams = new HttpParams({ fromObject: selection })
    return this.http.get<regCvretGiacenza[]>(this.baseUrl + 'api/RegCVRET/Get_RegCvretGiacenza', { params })
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }
  
  // public SetEDI_ORDERSBasket(model: VwEdiOrdersBasketT): Observable<VwEdiOrdersBasketT> {
  //   return this.http.post<VwEdiOrdersBasketT>(this.baseUrl + 'api/Basket/SetEDI_ORDERSBasket', model)
  //     //.catch(this.handleError);
  //     .pipe(catchError((error: Response | any) => throwError(`Error:${error.message || error} - ${error.statusText} (${error.status})`)));

  // }

  // public SetEDI_ORDERSBasketDetails(model: VwEdiOrdersBasketT): Observable<VwEdiOrdersBasketT> {
  //   return this.http.post<VwEdiOrdersBasketT>(this.baseUrl + 'api/Basket/SetEDI_ORDERSBasketDetails', model)
  //     .pipe(catchError((error: Response | any) => throwError(`Error:${error.message || error} - ${error.statusText} (${error.status})`)));
  // }


  public fetchData(controller: string, action: string = '', data?: string): Observable<any[]> {
    var url = this.baseUrl + `api/${controller}/${action}?${this.serializeModels(data)}`;
    return this.http.get<any[]>(url);
  }


  public Get_RegCvretConfigs() {

    return this.http.get(this.baseUrl + 'api/Generic/Get_RegCvretConfigs')
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  public Get_RegCvretConfig(parName: string) {
    return this.http.get(this.baseUrl + `api/Generic/Get_RegCvretConfig?parName=${parName}`)
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }


  public Set_RegCvretConfig(model: configModel): Observable<configModel> {
    return this.http.post<configModel>(this.baseUrl + 'api/Generic/Set_RegCvretConfig', model)
      .pipe(catchError((error: Response | any) => throwError(`Error:${error.message || error} - ${error.statusText} (${error.status})`)));
  }

  public GetCriticals() {

    return this.http.get(this.baseUrl + 'api/Generic/GetCriticals')
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  public GetCompanyUIData() {

    return this.http.get(this.baseUrl + 'api/Generic/GetCompanyUIData')
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  private serializeModels(data?: string): string {
    return data ? `&models=${data}` : '';
  }


}
