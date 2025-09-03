import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth'; // ✅ backend auth service

  constructor(private http: HttpClient) {}

  // ✅ Register (no role sent, backend will assign USER by default)
  register(user: { username: string; password: string; email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // ✅ Login with username + password
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('jwt', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
