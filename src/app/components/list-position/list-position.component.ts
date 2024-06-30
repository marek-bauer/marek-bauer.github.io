import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'list-position',
  standalone: true,
  imports: [MatChipsModule, MatIconModule, CommonModule],
  templateUrl: './list-position.component.html',
  styleUrl: './list-position.component.scss'
})
export class ListPositionComponent {
  @Input() title!: string;
  @Input() abstract!: string;
  @Input() tags!: Array<string>;
  @Input() publicationDate!: Date;
  @Input() hidden: boolean = false;

  @Output() tagClick = new EventEmitter<string>();
  @Output() click = new EventEmitter<void>();

  @Input() comments?: number | undefined;

  clicked(ev: Event): void {
    ev.preventDefault();
    this.click.emit();
  }

  clickedTag(ev: Event, tag: string): void {
    ev.stopPropagation();
    ev.preventDefault();
    this.tagClick.emit(tag);
  }

  
  printDate(date: Date): string {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();

    if (month.length < 2) { 
      month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
