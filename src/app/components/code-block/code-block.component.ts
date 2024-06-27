import { Component, Input } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'code-block',
  standalone: true,
  imports: [ Highlight ],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss'
})
export class CodeBlockComponent {
  @Input() lang!: string;

  private _code: string = "";
  @Input() set code(newCode: string | string[]) {
    if (Array.isArray(newCode)) {
      this._code = newCode.join('\n');
    } else {
      this._code = newCode;
    }
  }

  get code(): string {
    return this._code;
  }

  capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
