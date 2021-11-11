import {Component, Inject, Input, OnInit} from '@angular/core';
import {Comment, Post, Reply} from "../../interfaces";
import {ThemeToggleService} from "../../theme-toggle.service";
import {CommentsService} from "../../comments.service";
import {PostPageComponent} from "../../../post-page/post-page.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CommentsFormEditComponent} from "./comments-form-edit/comments-form-edit.component";
import {ReplyFormCreateComponent} from "./reply/reply-form-create/reply-form-create.component";
import {Observable} from "rxjs";
import {RepliesService} from "../../replies.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: Comment
  moreContent = false
  showReplies!: boolean

  constructor(
    public themeToggleService: ThemeToggleService,
    public commentsService: CommentsService,
    private dialog: MatDialog,
    public repliesService: RepliesService
    ) { }

  ngOnInit(): void {
    this.repliesService.getAllReplies().subscribe(replies => {
      if (replies?.length) {
        this.repliesService.replies = replies
      } else {
        this.repliesService.replies = []
      }
    })
  }

  remove(id: string) {
    this.commentsService.removeComment(id).subscribe(() => {
      this.commentsService.comments = this.commentsService.comments
        .filter(comment => comment.id !== id)
      this.repliesService.replies.map(reply => {
        if (reply.idComment === id) {
          this.repliesService.removeReply(reply.id!).subscribe()
        }
      })
    })
  }

  openEditModal() {
    this.dialog.open(CommentsFormEditComponent, {
      width: '60%',
      data: this.comment
    })
  }

  openReplyModal() {
    this.dialog.open(ReplyFormCreateComponent, {
      width: '60%',
      data: this.comment
    })
  }
}
