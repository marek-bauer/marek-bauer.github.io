import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: '[app-skill]',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
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
  @Input() tags: Array<string> = [];

  @Output() tagClicked = new EventEmitter<string>();

  clickedTag(event: Event, tag: string): void {
    event.stopPropagation();
    this.tagClicked.emit(tag);
  }
}
