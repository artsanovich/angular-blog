import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import uaLocale from "@angular/common/locales/uk";
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatDialogModule} from '@angular/material/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import {SharedModule} from "./shared/shared.module";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { environment } from '../environments/environment';
import { ThemeToggleComponent} from "./shared/components/theme-toggle/theme-toggle.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LangNavComponent} from "./shared/components/lang-nav/lang-nav.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsFormCreateComponent } from './post-page/comments-form-create/comments-form-create.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {CommentComponent} from "./shared/components/comment/comment.component";
import {CommentsFormEditComponent} from "./shared/components/comment/comments-form-edit/comments-form-edit.component";
import {ReplyComponent} from "./shared/components/comment/reply/reply.component";
import {ReplyFormCreateComponent} from "./shared/components/comment/reply/reply-form-create/reply-form-create.component";
import { CounterDirective } from './directives/counter.directive';
import { TextHiderDirective } from './directives/text-hider.directive';




registerLocaleData(uaLocale, 'ua')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    ThemeToggleComponent,
    LangNavComponent,
    CommentsFormCreateComponent,
    CommentComponent,
    CommentsFormEditComponent,
    ReplyComponent,
    ReplyFormCreateComponent,
    CounterDirective,
    TextHiderDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatOptionModule,
      MatSelectModule,
      MatButtonModule,
      ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      BrowserAnimationsModule
    ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {

}
