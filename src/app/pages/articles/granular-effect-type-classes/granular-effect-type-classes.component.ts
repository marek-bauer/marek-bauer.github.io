import { Component } from '@angular/core';
import { CodeBlockComponent } from '../../../components/code-block/code-block.component'
import { CodeLineComponent } from '../../../components/code-line/code-line.component'

@Component({
  selector: 'app-granular-effect-type-classes',
  standalone: true,
  imports: [ CodeBlockComponent, CodeLineComponent ],
  templateUrl: './granular-effect-type-classes.component.html',
  styleUrl: './granular-effect-type-classes.component.scss'
})
export class GranularEffectTypeClassesComponent {

}
