import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import uaLocale from "@angular/common/locales/uk";
import { ServiceWorkerModule } from '@angular/service-worker';

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
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LangNavComponent} from "./shared/components/lang-nav/lang-nav.component";




registerLocaleData(uaLocale, 'ua')

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
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
    LangNavComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
      SharedModule,
      FormsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ],
  providers: [INTERCEPTOR_PROVIDER, CookieService, LangNavComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
