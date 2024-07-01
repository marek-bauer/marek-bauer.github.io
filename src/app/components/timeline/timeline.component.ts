import { Component, ContentChildren, Directive, QueryList, Input, TemplateRef } from '@angular/core';
import { EventComponent, ImgIcon, MatIcon, AweIcon } from './event/event.component';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

function readDate(a: string): Date | 'Now' {
  if (a == 'Now') {
    return 'Now'
  } else {
    return new Date(a);
  }
}

function readIcon(a: string): MatIcon | ImgIcon | AweIcon {
  if (a.startsWith('mat:')) {
    return new MatIcon(a.substring(4));
  } else if (a.startsWith('img:')) {
    return new ImgIcon(a.substring(4));
  } else if (a.startsWith('fab:')) {
    return new AweIcon("fab", a.substring(4));
  } else if (a.startsWith('fas:')) {
    return new AweIcon("fas", a.substring(4));
  } else {
    throw "Wrong icon type " + a
  }
}

@Directive({
  selector: '[ev]',
  standalone: true,
})
export class Ev{
  @Input({required: true}) title!: string;
  @Input({required: true, transform: readDate}) startDate!: Date;
  @Input({required: false, transform: readDate}) endDate?: Date | 'Now' | undefined;
  @Input({required: true, transform: readIcon}) icon!: MatIcon | ImgIcon;
  @Input({required: false}) opened: boolean = false;

  constructor(public templateRef: TemplateRef<any>) {}

  isEmpty(): boolean{
    return false
  }
}

const MILISECONDS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, EventComponent, NgTemplateOutlet],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @ContentChildren(Ev) events!: QueryList<Ev>;
  preprocesedEvents: Array<{ev: Ev, dist: number}> = []

  computeDistance(x: Date, y: Date): number {
    return Math.min(Math.abs(y.getTime() - x.getTime()) / MILISECONDS_IN_YEAR * 30, 160)
  }

  private dateToName(d: Date | 'Now'): string {
    if (d == 'Now') {
      return 'Now'
    } else {
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[d.getMonth()] + ' ' + d.getFullYear()
    }
  }

  printDate(e: Ev): string {
    if (e.endDate === undefined) {
      return this.dateToName(e.startDate);
    } else {
      return this.dateToName(e.startDate) + ' - ' + this.dateToName(e.endDate);
    }
  }

  ngAfterContentInit() {
    let sorted  = this.events
      .toArray()
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    if (sorted.length == 0) {
      return;
    }
    this.preprocesedEvents = [{ev: sorted[0], dist: 0}]
    for (let i = 1; i < sorted.length; i++) {
      this.preprocesedEvents.push(
          { ev: sorted[i], 
            dist: this.computeDistance(sorted[i - 1].startDate, sorted[i].startDate)
          })
    }
  }
}
