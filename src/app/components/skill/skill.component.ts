import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-skill]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {
  @Input() noContent = false;
  @Input() opened = false;
  @Input() hidden = false;
  @Input() name!: string;
  @Input() level!: string;
  @Input() percent!: number;
}
