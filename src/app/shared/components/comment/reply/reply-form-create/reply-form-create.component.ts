import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Comment, Reply} from "../../../../interfaces";
import {ThemeToggleService} from "../../../../theme-toggle.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RepliesService} from "../../../../replies.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reply-form-create',
  host: {
    '[class.light-theme]': 'themeToggleService.themeToggle === false',
    '[class.dark-theme]': 'themeToggleService.themeToggle === true'
  },
  templateUrl: './reply-form-create.component.html',
  styleUrls: ['./reply-form-create.component.scss']
})
export class ReplyFormCreateComponent implements OnInit, OnDestroy {

  form!: FormGroup
  rSub!: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public commentData: Comment,
    private dialogRef: MatDialogRef<ReplyFormCreateComponent>,
    public themeToggleService: ThemeToggleService,
    private repliesService: RepliesService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      reply: new FormControl('', [Validators.minLength(10), Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const reply: Reply = {
      idComment: this.commentData.id,
      authorName: this.form.value.name,
      replyContent: this.form.value.reply,
      date: new Date()
    }
   this.repliesService.createReply(reply).subscribe(() => {
      reply.id = this.repliesService.replyObj.id
      this.repliesService.replies!.push(reply)
    })
    this.close()
  }

  close() {
    this.form.reset()
    this.dialogRef.close()
  }

  ngOnDestroy() {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

}
