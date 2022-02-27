import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const AUTH_API = 'http://localhost:8080/auth/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user): Observable<any> {
    return this.http.post(AUTH_API, {
      username: user.username,
      password: user.password
    })
  }
}
