import {Injectable} from '@angular/core';
import {Reply} from "./interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RepliesService {

  replies!: Reply[]
  replyObj!: Reply

  constructor(private http: HttpClient) {
  }

  createReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${environment.fbDbUrl}/replies.json`, reply)
      .pipe(map((response: any) => {
        this.replyObj = {
          ...reply,
          id: response.name
        }
        return this.replyObj
      }))
  }

  getAllReplies(): Observable<Reply[]> {
    return this.http.get(`${environment.fbDbUrl}/replies.json`)
      .pipe(map((response: { [key: string]: any }): any => {
        if (response) {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }))
        }
      }))
  }

  removeReply(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/replies/${id}.json`)
  }

}
