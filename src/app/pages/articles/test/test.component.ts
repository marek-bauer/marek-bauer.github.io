import { Component } from '@angular/core';
import { ArticleComponent } from '../../../components/article/article.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ArticleComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

}
