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
  languageSkillLevel(lvl: number): string {
    if (lvl <= 10) {
      return "Beginner (A1)"
    } else if (lvl <= 25) {
      return "Elementary (A2)"
    } else if (lvl <= 45) {
      return "Intermediate (B1)"
    } else if (lvl <= 65) {
      return "Upper Intermediate (B2)"
    } else if (lvl <= 80) {
      return "Advanced (C1)"
    } else if (lvl <= 99) {
      return "Proficient (C2)"
    } else {
      return "Native"
    }
  }

  technicalSkill(lvl: number): string {
    if (lvl <= 10) {
      return "Used Once"
    } else if (lvl <= 20) {
      return "Aware"
    } else if (lvl <= 30) {
      return "Beginner"
    } else if (lvl <= 40) {
      return "Novice"
    } else if (lvl <= 50) {
      return "Intermediate"
    } else if (lvl <= 60) {
      return "Proficient"
    } else if (lvl <= 70) {
      return "Advanced"
    } else if (lvl <= 80) {
      return "Specialist"
    } else if (lvl <= 90) {
      return "Master"
    } else {
      return "Expert"
    }
  }

  test(x: number) {
    return 'XD'
  }
}
