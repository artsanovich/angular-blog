import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LangNavService} from "../../lang-nav.service";
import {fromEvent} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-lang-nav',
  templateUrl: './lang-nav.component.html',
  styleUrls: ['./lang-nav.component.scss']
})
export class LangNavComponent implements OnInit, AfterViewInit {


  constructor(
    public langNavService: LangNavService,
    public translate: TranslateService

  ) { }

  ngOnInit(): void {
    this.langNavService.lang = this.langNavService.cookieService.get('lang') || 'en'
    this.langNavService.translate.use(this.langNavService.lang)
  }

  ngAfterViewInit() {
    fromEvent(document.getElementById('lang-select')!, 'change')
      .subscribe(event  => {
        this.langNavService.lang = this.langNavService.cookieService.get('lang') || 'en'
        this.langNavService.translate.use(this.langNavService.lang)
      })
  }
}
