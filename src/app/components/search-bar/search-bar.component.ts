import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import Fuse from 'fuse.js';

const fuseOptions = {
	threshold: 0.4,
	keys: [
		"name",
		"aliases"
	]
};

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() maxSuggestions: number = 3;
  @Output() search = new EventEmitter<string>();

  @Input() set suggestions(val: Array<{name: string, aliases: Array<string>}>) {
    this._suggestions = val;
    this._fuzeSuggestions = new Fuse(val, fuseOptions)
  }
  
  get suggestions(){
    return this._suggestions;
  }
  
  shownSuggestions: Array<string> = [];
  selectedSuggestion = 0;
  
  private _suggestions: Array<{ name: string, aliases: Array<string> }> = [];
  private _fuzeSuggestions: Fuse<{ name: string, aliases: string[] }> | undefined;
  private _value: string = "";
  private _numberOfSuggestions: number = 0;

  set value(newVal: string) {
    this._value = newVal;
    const searchRes = this._fuzeSuggestions?.search(newVal).map(x => x.item.name);

    if (searchRes == undefined || searchRes.length == 0) {
      this.shownSuggestions = [];
    } else {
      const first = searchRes[0];
      if (first == newVal) {
        this.shownSuggestions = [];
      } else {
        this.shownSuggestions = searchRes;
      }
    }
    this._numberOfSuggestions = this.shownSuggestions.length + 1;
    this.search.emit(this.value);
  }

  get value(): string {
    return this._value;
  }

  searchInput(ev: Event) {
    const target = ev.target as HTMLInputElement;
    this.value = target.value.trim();
  }

  generateSuggestions(input: string) {
    const results = this._fuzeSuggestions?.search(input);
  }

  onKeydown(ev: KeyboardEvent) {
    switch (ev.key) {
      case "ArrowDown":
        this.selectedSuggestion = (this.selectedSuggestion + 1) % this._numberOfSuggestions;
        ev.preventDefault();
        break;
      case "ArrowUp":
        this.selectedSuggestion = (this.selectedSuggestion + this._numberOfSuggestions - 1) % this._numberOfSuggestions;
        ev.preventDefault();
        break;
      case "Enter":
        if (this.selectedSuggestion != 0) {
          this.value = this.shownSuggestions[this.selectedSuggestion - 1];
        }
        break;
    }
  }

  selected(s: string) {
    this.value = s;
  }
}
