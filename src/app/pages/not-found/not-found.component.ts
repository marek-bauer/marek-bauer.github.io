import { Component } from '@angular/core';
import { TypedTextComponent } from '../../components/typed-text/typed-text.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, TypedTextComponent, ButtonComponent, FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor (iconLib: FaIconLibrary) {
    iconLib.addIconPacks(fas);
  }
}
