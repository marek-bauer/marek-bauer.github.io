import { Component, Input } from '@angular/core';
import { TypingTextComponent } from "../typing-text/typing-text.component"
import { CommentSectionComponent } from "../comment-section/comment-section.component"

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [TypingTextComponent, CommentSectionComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  @Input() key!: string;
  @Input() title!: string;
}
