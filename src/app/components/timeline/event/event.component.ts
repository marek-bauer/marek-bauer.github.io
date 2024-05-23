import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export class MatIcon {
  constructor(public icon: string) {};
}

export class ImgIcon {
  constructor(public path: string) {};
}

@Component({
  selector: '[event]',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input({required: false}) opened: boolean = false;
  @Input({required: true}) title!: string;
  @Input({required: true}) date!: string;
  @Input({required: true}) icon!: MatIcon | ImgIcon;
  @Input({required: false}) noContent: boolean = false;

  matIcon = MatIcon;
  imgIcon = ImgIcon;
}
