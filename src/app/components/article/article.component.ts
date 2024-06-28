import { Component, Input, Type } from '@angular/core';
import { CommentSectionComponent } from "../comment-section/comment-section.component"
import { EqComponent } from "../eq/eq.component"
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommentSectionComponent, CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  @Input() key!: string;
  @Input() title!: string;
  @Input() publicationDate!: Date;
  @Input() articleContent!: Type<Component>;

  constructor (private route: ActivatedRoute) { }

  dateOptions : Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
}
