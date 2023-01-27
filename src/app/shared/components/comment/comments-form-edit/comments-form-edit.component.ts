import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemeToggleService} from "../../../theme-toggle.service";
import {Comment} from "../../../interfaces";
import {CommentsService} from "../../../comments.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-comments-form-edit',
  host: {
    '[class.light-theme]': 'themeToggleService.themeToggle === false',
    '[class.dark-theme]': 'themeToggleService.themeToggle === true'
  },
  templateUrl: './comments-form-edit.component.html',
  styleUrls: ['./comments-form-edit.component.scss']
})
export class CommentsFormEditComponent implements OnInit, OnDestroy {

  form!: FormGroup
  cSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public commentData: Comment,
    private dialogRef: MatDialogRef<CommentsFormEditComponent>,
    public themeToggleService: ThemeToggleService,
    private commentsService: CommentsService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.commentData.authorName, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      reaction: new FormControl(this.commentData.reaction, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      comment: new FormControl(this.commentData.commentContent, [Validators.minLength(10), Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const comment: Comment = {
      id: this.commentData.id,
      idPost: this.commentData.idPost,
      authorName: this.form.value.name,
      reaction: this.form.value.reaction,
      commentContent: this.form.value.comment,
      editedDate: new Date()
    }
   this.commentsService.updateComment(comment).subscribe(() => {
      const updComment = this.commentsService.comments.find(updComment => updComment.id === comment.id)
      updComment!.authorName = comment.authorName
      updComment!.commentContent = comment.commentContent
      updComment!.reaction = comment.reaction
      updComment!.editedDate = comment.editedDate
    })
    this.close()
  }

  close() {
    this.dialogRef.close()
  }

  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe()
    }
  }

}
