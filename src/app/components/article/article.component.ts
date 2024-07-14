import { Component, Input, Type } from '@angular/core';
import { CommentSectionComponent } from "../comment-section/comment-section.component"
import { CommonModule } from '@angular/common';
import { TypingTextComponent } from '../typing-text/typing-text.component';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommentSectionComponent, CommonModule, TypingTextComponent, MatChipsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  @Input() key: string= "";
  @Input() title!: string;
  @Input() publicationDate!: Date;
  @Input() articleContent!: Type<Component>;
  @Input() tags: Array<String> = [];

  dateOptions : Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
}
