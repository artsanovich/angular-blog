import {Component, OnInit, Output} from '@angular/core';
import {ThemeToggleService} from "../../theme-toggle.service";

@Component({
  selector: 'app-theme',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {

  constructor(public themeToggleService: ThemeToggleService) { }


}
