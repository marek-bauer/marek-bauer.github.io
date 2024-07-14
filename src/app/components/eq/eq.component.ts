import { Component, Input } from '@angular/core';
import katex, {KatexOptions} from 'katex';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'eq',
  standalone: true,
  imports: [],
  templateUrl: './eq.component.html',
  styleUrl: './eq.component.scss'
})
export class EqComponent {
  @Input() equation!: string | Array<String>;

  private _block: boolean = false;

  @Input() set block(input: BooleanInput) {
    this._block = coerceBooleanProperty(input);
  }

  get block(): boolean {
    return this._block;
  }

  html: SafeHtml = "";

  options: KatexOptions = {
    displayMode: this._block,
  }
  
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    let equationHTML: string;
    if (this.equation instanceof Array) {
      equationHTML = this.renderToString(
        "\\begin{align}" + this.equation.map(l => l + "\\\\").join('') + "\\end{align}",
        {displayMode: true}
      );
    } else {
      equationHTML = this.renderToString(this.equation, {displayMode: this.block});
    }
    this.html = this.domSanitizer.bypassSecurityTrustHtml(equationHTML);
  }

  private renderToString(equation: any, options?: KatexOptions): string {
    return katex.renderToString(equation, options);
  }
}
