import { EventEmitter, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import jwtDecode from "jwt-decode";
import { ScalarService, scalarObject } from '../services/scalar.service';
import { authResult, TokenResponse } from '../interfaces/shared';
import { map, catchError, throwError as observableThrowError, of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";


@Injectable()
export class AuthService {
  authKey: string = "auth";
  clientId: string = "EOR";
  roleKey: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  public inRole: boolean;

  public is_USER?: boolean;
  public is_ADMIN?: boolean;

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any, @Inject('BASE_URL') private baseUrl: string,
    @Inject(ScalarService) private scalarService: ScalarService) {

    this.is_USER = false;
    this.is_ADMIN = false;

  }


  init() {

    this.logout();
  }



  // performs the login
  login(username: string, password: string): Observable<boolean> {
    var url = this.baseUrl + "api/token/auth";
    var data = {
      username: username,
      password: password,
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: "password",
      // space-separated list of scopes for which the token is issued
      scope: "offline_access profile email"
    };

    return this.getAuthFromServer(url, data);
  }

  land(ticket: string): Observable<boolean> {
    var url = this.baseUrl + "api/token/land";
    var data = {
      ticketGUID: ticket,
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: "au_ticket",
      // space-separated list of scopes for which the token is issued
      scope: "offline_access profile email"
    };

    return this.getAuthFromServer(url, data);
  }

  // try to refresh token
  refreshToken(): Observable<boolean> {
    var url = this.baseUrl + "api/token/auth";
    var data = {
      client_id: this.clientId,
      // required when signing up with username/password
      grant_type: "refresh_token",
      refresh_token: this.getAuth()!.refresh_token,
      // space-separated list of scopes for which the token is issued
      scope: "offline_access profile email"
    };

    return this.getAuthFromServer(url, data);
  }

  // retrieve the access & refresh tokens from the server
  getAuthFromServer(url: string, data: any): Observable<boolean> {
    return this.http.post<TokenResponse>(url, data).pipe(
      map((res) => {
        let token = res && res.token;
        // if the token is there, login has been successful
        if (token) {
          // store username and jwt token
          this.setAuth(res);
          this.isInRoleOnServer('EOR_USER').subscribe(res => {
            this.is_USER = res.Result;
          });
          this.isInRoleOnServer('EOR_ADMIN').subscribe(res => {
            this.is_ADMIN = res.Result;
          });

          // successful login
          return true;
        }
        // aggiunto da me
        this.setAuth(null);
        // failed login
        return observableThrowError('Unauthorized');
      }),
      catchError(error => {
        return new Observable<any>(error);
      }));
  }

  // performs the logout
  logout(): boolean {
    this.setAuth(null);
    return true;
  }

  // Persist auth into localStorage or removes it if a NULL argument is given
  setAuth(auth: TokenResponse | null): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (auth) {
        localStorage.setItem(
          this.authKey,
          JSON.stringify(auth));
      }
      else {
        localStorage.removeItem(this.authKey);
      }
    }
    return true;
  }

  // Retrieves the auth JSON object (or NULL if none)
  getAuth(): TokenResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      var i = localStorage.getItem(this.authKey);
      if (i) {
        return JSON.parse(i);
      }
    }
    return null;
  }

  // Returns TRUE if the user is logged in, FALSE otherwise.
  isLoggedIn(): boolean {

    if (isPlatformBrowser(this.platformId)) {
      var token = localStorage.getItem(this.authKey)
      if (token) {
        return true;
      }
    }
    return false;

  }


  isInRole(roleId: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      var token = localStorage.getItem(this.authKey)
      if (token) {
        var decoded = jwtDecode(token);
        return decoded[this.roleKey] == roleId;
      }
    }
    return false;
  }

  isInRoleOnServer(roleId: string): Observable<authResult> {
    if (isPlatformBrowser(this.platformId)) {
      var i = localStorage.getItem(this.authKey);
      // if (i) {
      const url = this.baseUrl + "api/token/IsInRole";
      let queryParams = new HttpParams()
        .append("roleId", roleId);
      return this.getRoleFromServer(url, queryParams);
      //}
    }

  }

  getRoleFromServer(url: string, queryParams: HttpParams): Observable<authResult> {

    return this.http.get<authResult>(url, { params: queryParams });
  }

  // isInRoleOnServer(roleId: string): Observable<boolean> {
  //   if (isPlatformBrowser(this.platformId)) {
  //     var i = localStorage.getItem(this.authKey);
  //     if (i) {
  //       return this.scalarService.fetchData("Token", "IsInRole", roleId).pipe(map(
  //         (res) => (res.Value == "true" ? true : false)));
  //     }
  //   }

  // }





  getJumpTicket(where: string): Observable<scalarObject> {
    if (isPlatformBrowser(this.platformId)) {
      var i = localStorage.getItem(this.authKey);
      if (i) {
        return this.scalarService.fetchData("Token", "GetJumpTicket", encodeURIComponent(where));
      }
    }
  }


}


