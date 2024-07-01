import { Component } from '@angular/core';
import { SearchSkillsComponent, Category, Skill } from '../../components/search-skills/search-skills.component';
import { TypingTextComponent } from '../../components/typing-text/typing-text.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SearchSkillsComponent, Category, Skill, TypingTextComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  test(x: number) {
    return 'XD'
  }
}
