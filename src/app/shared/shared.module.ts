import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {CommonModule} from "@angular/common";


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
