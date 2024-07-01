import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

export class MatIcon {
  constructor(public icon: string) {};
}

export class AweIcon {
  constructor(public family: string, public icon: string) {};
}


export class ImgIcon {
  constructor(public path: string) {};
}

@Component({
  selector: '[event]',
  standalone: true,
  imports: [CommonModule, MatIconModule, FontAwesomeModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input({required: false}) opened: boolean = false;
  @Input({required: true}) title!: string;
  @Input({required: true}) date!: string;
  @Input({required: true}) icon!: MatIcon | ImgIcon | AweIcon;
  @Input({required: false}) noContent: boolean = false;

  matIcon = MatIcon;
  imgIcon = ImgIcon;
  aweIcon = AweIcon;

  constructor (iconLib: FaIconLibrary) {
    iconLib.addIconPacks(fas, fab);
  }
}
