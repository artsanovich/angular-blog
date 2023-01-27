import {
  Directive,
  DoCheck,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Reply, Comment} from "../shared/interfaces";

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements DoCheck {
  counter!: number
  @Input('appCounterComment') comment!: Comment
  @Input('appCounterReplies') replies!: Reply[]

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  ngDoCheck() {
    this.viewContainer.clear()
    this.countReplies()
    this.viewContainer.createEmbeddedView(this.templateRef, { res: this.counter});
  }

  countReplies() {
    this.counter = 0
    this.replies.map(reply => {
      if (reply.idComment === this.comment.id) this.counter++
    })
  }
}
