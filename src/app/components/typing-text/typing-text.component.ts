import { Component, Input, NgZone } from '@angular/core';

@Component({
  selector: '[typing-text]',
  standalone: true,
  imports: [],
  templateUrl: './typing-text.component.html',
  styleUrl: './typing-text.component.scss'
})
export class TypingTextComponent {
  @Input() text!: string;
  @Input() cursor: string = '_';
  @Input() typingSpeedMs: number = 200;
  @Input() coursorBlinkingMs: number = 500;

  constructor(private _ngZone: NgZone) { }
  
  cursorShown: boolean = true;
  writtenText: string = "";
  private position: number = 0;

  private typingEffect = () => {
    if (this.position < this.text.length) {
      this._ngZone.run(() => {
          this.position += 1;
          this.writtenText = this.text.substring(0, this.position);
      });
      setTimeout(this.typingEffect, this.typingSpeedMs);
    } else {
      setTimeout(this.blinkCursor, this.coursorBlinkingMs);
    }
  }

  private blinkCursor = () => {
    this._ngZone.run(() => {
      this.cursorShown = !this.cursorShown;
    });
    setTimeout(this.blinkCursor, this.coursorBlinkingMs);
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      setTimeout(this.typingEffect, this.typingSpeedMs);
    })
  }
}
