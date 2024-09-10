import { Component } from '@angular/core';
import { TimelineComponent, Ev } from '../../components/timeline/timeline.component';
import { TypedTextComponent } from '../../components/typed-text/typed-text.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [Ev, TimelineComponent, TypedTextComponent, ButtonComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {
}
