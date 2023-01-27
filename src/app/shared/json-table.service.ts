import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JPerson, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JsonTableService {

  jPersons!: JPerson[]

  constructor(private http: HttpClient) { }

  getAllJPersons ():Observable<JPerson[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`)
      .pipe(map((response:{[key: string]: any}): any => {
        if (response) {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
            }))
        }
      }))
  }

}
