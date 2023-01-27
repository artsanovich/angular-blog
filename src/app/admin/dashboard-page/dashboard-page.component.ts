import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {LikePost, Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";
import {LikesService} from "../../shared/likes.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  likePosts: LikePost[] = []
  pSub!: Subscription
  lpSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(
    private postsService: PostsService,
    private alert: AlertService,
    private likesService: LikesService

  ) { }

  ngOnInit(): void {

    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
    this.lpSub = this.likesService.getAllLikes().subscribe(likePosts => {
      this.likePosts = likePosts
    })
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id)
      this.alert.danger('Post was deleted')
    })
  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
    if(this.dSub) {
      this.dSub.unsubscribe()
    }
    if(this.lpSub) {
      this.lpSub.unsubscribe()
    }
  }

}
