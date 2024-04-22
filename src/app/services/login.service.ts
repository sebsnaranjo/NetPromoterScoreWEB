import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlAPI = '/api/Login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.urlAPI}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {}, httpOptions);
  }
}
