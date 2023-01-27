import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class LangNavService {

  lang!: string

  constructor(
    public translate: TranslateService,
    public cookieService: CookieService,
  ) {
    translate.addLangs(['en', 'ua'])
    translate.setDefaultLang('en');
  }

  changeLang(lang: string) {
    this.cookieService.set('lang', lang, {path: '/'});
    this.translate.use(lang)
  }
}
