import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Comment, LikePost, Post} from "./interfaces";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: Comment[] = []
  commentObj!: Comment

  constructor(private http: HttpClient) {}

  createComment(comment: Comment):Observable<Comment> {
    return this.http.post<Comment>(`${environment.fbDbUrl}/comments.json`, comment)
      .pipe(map((response: any) => {
        this.commentObj = {
          ...comment,
          id: response.name
        }
        return this.commentObj
      }))
  }

  getAllComments ():Observable<Comment[]> {
    return this.http.get(`${environment.fbDbUrl}/comments.json`)
      .pipe(map((response:{[key: string]: any}): any => {
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

  removeComment(id: string):Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/comments/${id}.json`)
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${environment.fbDbUrl}/comments/${comment.id}.json`, comment)
      .pipe(map((comment: Comment) => {
        return {
          ...comment,
          editedDate: new Date(comment.editedDate!)
        }
      }))
  }
}
