import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResult, Filterbag } from '../interfaces/shared'
import { vwRegCvretChiusure, vwRegCvretGiacenza } from '../interfaces/models'

@Injectable({
  providedIn: 'root'
})
export class ClosingsDataService
  extends BaseService {
  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  getData<ApiResult>(
    fb: Filterbag
  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/RegCVRET/Get_RegCvretChiusure';
    var params = new HttpParams()
      .set("pageIndex", fb.pageIndex)
      .set("pageSize", fb.pageSize)
      .set("sortColumn", fb.sortColumn)
      .set("sortOrder", fb.sortOrder);

    if (fb.filterQuery) {
      params = params
        .set("filterColumn", fb.filterColumn)
        .set("filterQuery", fb.filterQuery);
    }
    if (fb.codCliFat) { params = params.set("codCliFat", fb.codCliFat) }
    if (fb.codart) { params = params.set("codart", fb.codart) }
    if (fb.codCausaleMov) { params = params.set("codCausaleMov", fb.codCausaleMov) }
    if (fb.segnoMov) { params = params.set("segnoMov", fb.segnoMov) }
    if (fb.dataStatoDa) { params = params.set("dataStatoDa", fb.dataStatoDa) }
    if (fb.dataStatoA) { params = params.set("dataStatoA", fb.dataStatoA) }

    return this.http.get<ApiResult>(url, { params });
  }
  

  public doClosing(model: vwRegCvretChiusure): Observable<any> {
    return this.http.post<vwRegCvretChiusure>(this.baseUrl + 'api/RegCVRET/Set_RegCvretChiusure', model)
      .pipe(catchError((error: Response | any) => throwError(`Error:${error.message || error} - ${error.statusText} (${error.status})`)));
  }

  get<vwRegCvretChiusure>(id): Observable<vwRegCvretChiusure> {
    var url = this.baseUrl + "api/RegCVRET/Clo/" + id;
    return this.http.get<vwRegCvretChiusure>(url);
  }

  put<vwRegCvretChiusure>(item): Observable<vwRegCvretChiusure> {
    var url = this.baseUrl + "api/RegCVRET/Clo/" + item.id;
    return this.http.put<vwRegCvretChiusure>(url, item);
  }

  post<vwRegCvretChiusure>(item): Observable<vwRegCvretChiusure> {
    var url = this.baseUrl + "api/RegCVRET/Clo/";
    return this.http.post<vwRegCvretChiusure>(url, item);
  }

  delete<vwRegCvretChiusure>(item): Observable<vwRegCvretChiusure> {
    var url = this.baseUrl + "api/RegCVRET/Clo/";
    return this.http.delete<vwRegCvretChiusure>(url);
  }

}


