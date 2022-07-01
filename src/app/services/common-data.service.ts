import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  get_Criticals() {

    return this.http.get<any>(this.baseUrl + 'api/Generic/GetCriticals')
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }

  get_CompanyUIData() {

    return this.http.get<any>(this.baseUrl + 'api/Generic/GetCompanyUIData')
      .pipe(catchError((error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)));
  }



  //get_RegCvret<regCvret>(): Observable<regCvret>
  //{
  //  var url = this.baseUrl + 'api/GenericC/Get_RegCvret';
  //  return this.http.get<regCvret>(url);
  //}

  get_Dict(controller: string, action: string = '', pars: string): Observable<any[]> {
    var url = this.baseUrl + `api/${controller}/${action}` + 
    (pars == undefined ? "" : `?pars=${pars}`);
    return this.http.get<any[]>(url);
  }


}

