import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ILogin } from '../models/interfaces/dtos/ILogin.dto';
import { Observable, switchMap, tap } from 'rxjs';
import { ILoginResponse } from '../models/interfaces/dtos/ILoginResponse.dto';
import { NgxPermissionsService } from 'ngx-permissions';
import { API_URL } from '../interceptors/baseurl.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: any;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private ngxPermissionService: NgxPermissionsService,
    @Inject(API_URL) private apiUrl: string
  ) {}

  login(user: ILogin): Observable<void> {
    return this.http
      .post<ILoginResponse>(`${this.apiUrl}/auth/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((res: any) => {
          const user = res.data.user;
          this.tokenService.setUserData(user);
          this.tokenService.setToken('accessToken', res.data.accessToken);
        }),
        switchMap(async () => this.getRolePermissions())
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(this.apiUrl + '/auth/logout', {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.tokenService.clearToken('accessToken');
          this.ngxPermissionService.flushPermissions();
        })
      );
  }

  getRolePermissions(): void {
    if (this.tokenService.getUserData() === null) {
      return;
    }
    return this.http
      .get(this.apiUrl + '/user/getRole', {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          if (res.status) {
            const role = res.data.roleId.roleName;
            this.ngxPermissionService.loadPermissions([role]);
          }
        },
      })
      .add(() => {
        this.loggedUser = this.tokenService.getUserData();
      });
  }
}
