import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {Observable, Subscription} from "rxjs";
import {Comment, Post} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {ThemeToggleService} from "../shared/theme-toggle.service";
import {LangNavService} from "../shared/lang-nav.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentsFormCreateComponent} from "./comments-form-create/comments-form-create.component";
import {CommentsService} from "../shared/comments.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})



export class PostPageComponent implements OnInit {


  post$!: Observable<Post>
  currentRoute!: string

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    public themeToggleService: ThemeToggleService,
    public langNavService: LangNavService,
    private dialog: MatDialog,
    public commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        this.currentRoute = params.id
        return this.postService.getById(params['id'])
      }))

     this.commentsService.getAllComments().subscribe(comments => {
      if (comments?.length) {
        this.commentsService.comments = comments
      } else {
        this.commentsService.comments = []
      }
    })
  }

  openModal() {
    this.dialog.open(CommentsFormCreateComponent, {
      width: '60%',
      data: this.currentRoute
    })
  }
}
