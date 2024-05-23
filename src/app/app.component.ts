import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My-portfolio-webpage';
  pages = [
    {link: '/home', name: 'Home'},
    {link: '/cv', name: 'Cv'},
    {link: '/skills', name: 'Skills'},
  ]
}
