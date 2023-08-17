import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebReqService } from './web-req.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private webService: WebReqService, private router: Router) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');

        if (accessToken && refreshToken) {
          this.setSession(res.body._id, accessToken, refreshToken);
        }
        console.log('Login');
      })
    );
  }


  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');

        if (accessToken && refreshToken) {
          this.setSession(res.body._id, accessToken, refreshToken);
          console.log('Successfully Signed Up');
        }
      })
    );
  }


  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    const refreshToken = this.getRefreshToken() || '';
    const uId = this.getUserId() || '';
    return this.http.get(`${this.webService.ROOT_URL}/users/me/acctoken`, {
      headers: {
        'x-refresh-token': refreshToken,
        '_id': uId
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        const accessToken = res.headers.get('x-access-token');
        if (accessToken !== null) {
          this.setAccessToken(accessToken);
        }
      })
    )
  }

}
