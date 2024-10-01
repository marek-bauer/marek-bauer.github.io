import { Component, Input } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'code-line',
  standalone: true,
  imports: [ Highlight ],
  templateUrl: './code-line.component.html',
  styleUrl: './code-line.component.scss'
})
export class CodeLineComponent {
  @Input() lang!: string;
  @Input() code!: string;

}
