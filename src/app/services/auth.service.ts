import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '../interfaces/ILoginresponse';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);

    private baseUrl = 'https://empresacontruccion-production.up.railway.app';

    //private baseUrl = 'http://localhost:8000';

  login(usuarioLog: { email: string; password: string }) {
    return firstValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, usuarioLog)
    );


    }
    
        isLogged() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    return true;
  
    }
    
    
  register(data: { email: string; password: string; first_name: string; last_name: string }) {
  return firstValueFrom(
    this.http.post(`${this.baseUrl}/auth/register`, data)
  );
}
}
  
