import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import { CommentComponent } from './components/comment/comment.component';
import { CommentsFormEditComponent } from './components/comment/comments-form-edit/comments-form-edit.component';
import { ReplyComponent } from './components/comment/reply/reply.component';
import {CommonModule} from "@angular/common";
import { ReplyFormCreateComponent } from './components/comment/reply/reply-form-create/reply-form-create.component';


@NgModule({
    imports: [
        HttpClientModule,
        QuillModule.forRoot(),
        CommonModule
    ],
  exports: [
    HttpClientModule,
    QuillModule
  ],
  declarations: [

  ]

})

export class SharedModule {

}
