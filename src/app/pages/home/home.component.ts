import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { TypingTextComponent } from '../../components/typing-text/typing-text.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TypingTextComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
