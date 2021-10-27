import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../interfaces";
import {ThemeToggleService} from "../../theme-toggle.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post

  constructor(public themeToggleService: ThemeToggleService) {
  }

  ngOnInit(): void {
  }

}
