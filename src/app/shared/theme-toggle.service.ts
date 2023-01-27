import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})

export class ThemeToggleService {

  themeToggle!: boolean

  constructor(private cookieService: CookieService) {
    if (cookieService.check('themeToggle')) {
      this.themeToggle = JSON.parse(cookieService.get('themeToggle'))
    }
  }

  switchTheme() {
    this.themeToggle = !this.themeToggle
    this.cookieService.set('themeToggle', JSON.stringify(this.themeToggle), {path: '/'});
  }


}
