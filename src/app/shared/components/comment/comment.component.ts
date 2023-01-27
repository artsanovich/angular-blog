import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from "../../interfaces";
import {ThemeToggleService} from "../../theme-toggle.service";
import {CommentsService} from "../../comments.service";
import {MatDialog} from "@angular/material/dialog";
import {CommentsFormEditComponent} from "./comments-form-edit/comments-form-edit.component";
import {ReplyFormCreateComponent} from "./reply/reply-form-create/reply-form-create.component";
import {RepliesService} from "../../replies.service";
import {LangNavService} from "../../lang-nav.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() comment!: Comment
  moreContent = false
  showReplies!: boolean

  cSub1!: Subscription
  cSub2!: Subscription
  cSub3!: Subscription

  constructor(
    public themeToggleService: ThemeToggleService,
    public commentsService: CommentsService,
    private dialog: MatDialog,
    public repliesService: RepliesService,
    public langNavService: LangNavService
  ) {
  }

  ngOnInit(): void {
    this.cSub1 = this.repliesService.getAllReplies().subscribe(replies => {
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

  ngOnDestroy() {
    if (this.cSub1) {
      this.cSub1.unsubscribe()
    }
    if (this.cSub2) {
      this.cSub2.unsubscribe()
    }
    if (this.cSub3) {
      this.cSub3.unsubscribe()
    }
  }

}
