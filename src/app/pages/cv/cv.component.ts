import { Component } from '@angular/core';
import { TimelineComponent, Ev } from '../../components/timeline/timeline.component';
import { TypingTextComponent } from '../../components/typing-text/typing-text.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [Ev, TimelineComponent, TypingTextComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
}
