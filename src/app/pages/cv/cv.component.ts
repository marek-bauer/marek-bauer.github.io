import { Component } from '@angular/core';
import { TimelineComponent, Ev } from '../../components/timeline/timeline.component';
import { TypedTextComponent } from '../../components/typed-text/typed-text.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [Ev, TimelineComponent, TypedTextComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
}
