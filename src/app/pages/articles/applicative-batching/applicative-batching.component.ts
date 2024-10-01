import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component'
import { CodeLineComponent } from '../../../components/code-line/code-line.component'

@Component({
  selector: 'app-applicative-batching',
  standalone: true,
  imports: [CodeBlockComponent, CodeLineComponent],
  templateUrl: './applicative-batching.component.html',
  styleUrl: './applicative-batching.component.scss'
})
export class ApplicativeBatchingComponent {

}
