import { Component, OnInit } from '@angular/core';
import {ThemeToggleService} from "../../theme-toggle.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public themeToggleService: ThemeToggleService) { }

  ngOnInit(): void {
  }

}
