import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class ScalarService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }


  fetchData(controller: string, action: string = '', data?: string): Observable<scalarObject> {
    var url = this.baseUrl + `api/${controller}/${action}/${data}`;
    return this.http.get<scalarObject>(url);
  }


  // fetchData(controller: string, action: string = '', data?: string): Observable<scalarObject> {
  //   var params = new HttpParams()
  //   params = params.set('data', data);
  //   var url = this.baseUrl + `api/${controller}/${action}`;
  //   return this.http.get<scalarObject>(url, { params});
  // }

  private serializeModels(data?: string): string {
    return data ? `parValue=${data}` : '';
  }
}

export interface scalarObject {
  Value: string;
}
