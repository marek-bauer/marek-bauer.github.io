import { Component, Input, NgZone } from '@angular/core';

@Component({
  selector: '[typed-text]',
  standalone: true,
  imports: [],
  templateUrl: './typed-text.component.html',
  styleUrl: './typed-text.component.scss'
})
export class TypedTextComponent {
  @Input() text!: string;
  @Input() cursor: string = '_';
  @Input() coursorBlinkingMs: number = 500;

  constructor(private _ngZone: NgZone) { }
  
  cursorShown: boolean = true;

  private blinkCursor = () => {
    this._ngZone.run(() => {
      this.cursorShown = !this.cursorShown;
    });
    setTimeout(this.blinkCursor, this.coursorBlinkingMs);
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      setTimeout(this.blinkCursor, this.coursorBlinkingMs);
    })
  }
}
