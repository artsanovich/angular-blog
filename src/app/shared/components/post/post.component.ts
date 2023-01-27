import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LikePost, Post} from "../../interfaces";
import {ThemeToggleService} from "../../theme-toggle.service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {LikesService} from "../../likes.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy{

  @Input() post!: Post
  likedPosts!: LikePost[]
  likeToggle!: boolean
  lpSub1!: Subscription
  lpSub2!: Subscription
  lpSub3!: Subscription
  lpSub4!: Subscription
  lpSub5!: Subscription

  constructor(
    public themeToggleService: ThemeToggleService,
    private likesService: LikesService
  ) {
  }

  ngOnInit(): void {
     this.lpSub1 = this.likesService.getLikeById(this.post.id!).subscribe(resp => {
       if (resp?.find(val => val.id)) this.likeToggle = true
   })
  }

  switchLike() {
    this.likeToggle = !this.likeToggle

    const likePost: LikePost = {
      idPost: this.post.id,
      like: this.likeToggle
    }
    if (this.likeToggle) {
      this.lpSub2 = this.likesService.setLikePost(likePost).subscribe(() => {
        likePost.id = this.likesService.likeObj.id
      })
    } else {
      this.lpSub4 = this.likesService.getAllLikes()
        .pipe(map(resp => {
          for (let res of resp) {
            if (likePost.idPost === res.idPost) {
              likePost.id = res.id
              this.lpSub5 = this.likesService.removeLikePost(likePost.id!).subscribe()
            }
          }
        })).subscribe()
    }
  }

  ngOnDestroy() {
    if(this.lpSub1) {
      this.lpSub1.unsubscribe()
    }
    if(this.lpSub2) {
      this.lpSub2.unsubscribe()
    }
    if(this.lpSub3) {
      this.lpSub3.unsubscribe()
    }
    if(this.lpSub4) {
      this.lpSub4.unsubscribe()
    }
    if(this.lpSub5) {
      this.lpSub5.unsubscribe()
    }
  }
}
