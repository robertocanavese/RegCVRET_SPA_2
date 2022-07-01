import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ApiResult, Filterbag } from '../interfaces/shared'

@Injectable({
  providedIn: 'root'
})
export class StockItemDataService
  extends BaseService {
  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl);
  }


  getData<ApiResult>(
    fb: Filterbag
  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/RegCVRET/Get_RegCvretGiacenza';
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

    return this.http.get<ApiResult>(url, { params });
  }


  getValorizzata<ApiResult>(
    fb: Filterbag
  ): Observable<ApiResult> {
    var url = this.baseUrl + 'api/RegCVRET/Get_RegCvretValorizzata';
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
    if (fb.dataStatoA) { params = params.set("dataStatoA", fb.dataStatoA) }

    return this.http.get<ApiResult>(url, { params });
  }

  getValorizzataForExport(
    fb: Filterbag
  ) {
    var url = this.baseUrl + 'api/RegCVRET/Get_RegCvretValorizzataForExport';
    var params = new HttpParams()
    if (fb.codCliFat) { params = params.set("codCliFat", fb.codCliFat) }
    if (fb.dataStatoA) { params = params.set("dataStatoA", fb.dataStatoA) }

    return this.http.get(url, { params });

  }

}
