import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filterbag } from '../interfaces/shared'

export abstract class BaseService {
  constructor(
    public http: HttpClient,
    public baseUrl: string
  ) {
  }

  abstract getData<ApiResult>(
    //pageIndex: number,
    //pageSize: number,
    //sortColumn: string,
    //sortOrder: string,
    //filterColumn: string,
    //filterQuery: string,
    filterBag: Filterbag,
  ): Observable<ApiResult>;

}
