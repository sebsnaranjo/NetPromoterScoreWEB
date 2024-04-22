import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlAPI = '/api/User';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(`${this.urlAPI}`);
  }

  getUserID(id: number){
    return this.http.get<any>(`${this.urlAPI}/${id}`);
  }

  editUser(estudiante: UserData) {
    return this.http.put<any>(`${this.urlAPI}/Edit`, estudiante);
  }
}
