import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResult, Filterbag } from '../interfaces/shared'
import { vwRegCvretMovimenti } from '../interfaces/models'

@Injectable({
  providedIn: 'root'
})
export class MovementsDataService
  extends BaseService {
  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }

  getData<ApiResult>(
    fb: Filterbag
  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/RegCVRET/Get_RegCvretMovimenti';
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

  getMonthlyAdjustments<ApiResult>(
    fb: Filterbag
  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/RegCVRET/Get_RegCvretMonthlyAdjustments';
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

  public setMonthlyAdjustments(model: Filterbag): Observable<any> {
    return this.http.post<Filterbag>(this.baseUrl + 'api/RegCVRET/Set_RegCvretMonthlyAdjustments', model)
      .pipe(catchError((error: Response | any) => throwError(`Error:${error.message || error} - ${error.statusText} (${error.status})`)));
  }

  get<vwRegCvretMovimenti>(id): Observable<vwRegCvretMovimenti> {
    var url = this.baseUrl + "api/RegCVRET/Mov/" + id;
    return this.http.get<vwRegCvretMovimenti>(url);
  }

  put<vwRegCvretMovimenti>(item): Observable<vwRegCvretMovimenti> {
    var url = this.baseUrl + "api/RegCVRET/Mov/" + item.id;
    return this.http.put<vwRegCvretMovimenti>(url, item);
  }

  post<vwRegCvretMovimenti>(item): Observable<vwRegCvretMovimenti> {
    var url = this.baseUrl + "api/RegCVRET/Mov/";
    return this.http.post<vwRegCvretMovimenti>(url, item);
  }

  delete<vwRegCvretMovimenti>(item): Observable<vwRegCvretMovimenti> {
    var url = this.baseUrl + "api/RegCVRET/Mov/";
    return this.http.delete<vwRegCvretMovimenti>(url);
  }

}


