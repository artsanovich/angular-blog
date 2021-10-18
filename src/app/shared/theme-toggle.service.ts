import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ThemeToggleService {

  themeToggle!:boolean

  constructor() {
    this.themeToggle = JSON.parse(localStorage.getItem("themeToggle")!)
  }

  switchTheme() {
    this.themeToggle = !this.themeToggle
    localStorage.setItem("themeToggle", JSON.stringify(this.themeToggle))
  }

}
