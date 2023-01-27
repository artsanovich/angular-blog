import {Injectable} from '@angular/core';
import {LikePost} from "./interfaces";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LikesService {

  likeObj!: LikePost

  constructor(private http: HttpClient) {}

  setLikePost(likePost: LikePost):Observable<LikePost> {
    return this.http.post<LikePost>(`${environment.fbDbUrl}/likePosts.json`, likePost)
      .pipe(map((response: any) => {
        this.likeObj = {
          ...likePost,
          id: response.name
        }
        return this.likeObj
      }))
  }

  getAllLikes ():Observable<LikePost[]> {
    return this.http.get(`${environment.fbDbUrl}/likePosts.json`)
      .pipe(map((response:{[key: string]: any}): any => {
        if (response) {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
        }
      }))
  }

  getLikeById(id: string):Observable<LikePost[] | null> {
    return this.http.get<LikePost[]>(`${environment.fbDbUrl}/likePosts.json`)
      .pipe(map((response:{[key: string]: any}): any => {
        if (response) {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
            .filter(val => {
              return val.idPost === id
            })
        }
      }))
  }

  updateLikePost(likePost: LikePost): Observable<LikePost> {
    return this.http.patch<LikePost>(`${environment.fbDbUrl}/likePosts/${likePost.id}.json`, likePost)
  }

  removeLikePost(id: string):Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/likePosts/${id}.json`)
  }

}
