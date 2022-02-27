import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const COVID_API = 'http://localhost:8080/api/covid'

@Injectable({
  providedIn: 'root'
})
export class CovidInfoService {

  constructor(private http: HttpClient) { }

  getCovidInfo(): Observable<any> {
    return this.http.get(COVID_API);
  }

  addCovidInfo(covidInfo): Observable<any> {
    return this.http.post(COVID_API, {
      department : covidInfo.department,
      quarantine : covidInfo.quarantine,
      personList : covidInfo.personList
    });
  }
}
