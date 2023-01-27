import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Reply} from "../../../interfaces";
import {RepliesService} from "../../../replies.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit, OnDestroy {

  @Input() reply!: Reply
  rSub!: Subscription

  constructor(private repliesService: RepliesService) {
  }

  ngOnInit(): void {
  }

  remove(id: string) {
    this.rSub = this.repliesService.removeReply(id).subscribe(() => {
      this.repliesService.replies = this.repliesService.replies
        .filter(reply => reply.id !== id)
    })
  }

  ngOnDestroy() {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

}
