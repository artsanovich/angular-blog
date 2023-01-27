import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemeToggleService} from "../../shared/theme-toggle.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Comment} from "../../shared/interfaces";
import {CommentsService} from "../../shared/comments.service";


@Component({
  selector: 'app-commends-form',
  host: {
    '[class.light-theme]': 'themeToggleService.themeToggle === false',
    '[class.dark-theme]': 'themeToggleService.themeToggle === true'
  },
  templateUrl: './comments-form-create.component.html',
  styleUrls: ['./comments-form-create.component.scss']
})
export class CommentsFormCreateComponent implements OnInit {

  form!: FormGroup
  selected = 'positive'

  constructor(
    @Inject(MAT_DIALOG_DATA) public currentRoute: string,
    public themeToggleService: ThemeToggleService,
    private dialogRef: MatDialogRef<CommentsFormCreateComponent>,
    public commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      reaction: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      comment: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const comment: Comment = {
      idPost: this.currentRoute,
      authorName: this.form.value.name,
      reaction: this.form.value.reaction,
      commentContent: this.form.value.comment,
      date: new Date()
    }
    this.commentsService.createComment(comment).subscribe(() => {
      comment.id = this.commentsService.commentObj.id
        this.commentsService.comments.push(comment)
    })
    this.close()
  }

  close() {
    this.form.reset()
    this.dialogRef.close()
  }
}
