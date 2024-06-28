import { Component, Directive, Input, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import { CommonModule, NgTemplateOutlet, NgFor } from '@angular/common';
import { SkillComponent } from './skill/skill.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatChipsModule } from '@angular/material/chips';
import Fuse from 'fuse.js';

@Directive({
  selector: '[skill]',
  standalone: true,
})
export class Skill{
  @Input() name!: string;
  @Input() lvl!: number;
  @Input() aliases: Array<string> = [];
  @Input() tags: Array<string> = [];
  @Input() noContent: boolean = false;

  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'category',
  template: '',
  standalone: true,
  imports: [CommonModule]
})
export class Category{
  @Input({required: true}) name!: string;
  @Input({required: true}) skillLevelFn!: (x: number) => string;
  @Input({required: false}) opened: boolean = true;
  @ContentChildren(Skill) skills!: QueryList<Skill>;
}

const fuseOptions = {
	threshold: 0.5,
	keys: [
		"name",
		"aliases",
    "tags"
	]
};

@Component({
  selector: 'search-skills',
  standalone: true,
  imports: [CommonModule, NgFor, NgTemplateOutlet, SkillComponent, Category, SearchBarComponent, MatChipsModule],
  templateUrl: './search-skills.component.html',
  styleUrl: './search-skills.component.scss'
})
export class SearchSkillsComponent {
  @ContentChildren(Category) categories!: QueryList<Category>;
  suggestions: Array<{name: string, aliases: Array<string>}> = [];
  shownSkills: Set<string> = new Set();

  private _fuze: Fuse<{ name: string, aliases: string[], tags: string[] }> | undefined;
  private _allSkills: Array<string> = [];

  ngAfterContentInit() {
    const tags = this.categories.toArray().flatMap(c => c.skills.toArray().flatMap(s => s.tags));
    const uniqueTags = [...new Set(tags)];
    const skills = this.categories.toArray().flatMap(c => c.skills.toArray())
    this.suggestions = [...skills.map(s => ({name: s.name, aliases: s.aliases})),  
                        ...uniqueTags.map(t => ({name: t, aliases: [t]}))];

    const skillFuze = skills.map(s => ({name: s.name, aliases: s.aliases, tags: s.tags}));
    this._allSkills = skills.map(s => s.name);
    this.shownSkills = new Set(this._allSkills);
    this._fuze = new Fuse(skillFuze, fuseOptions);
  }

  onSearch(filter: string) {
    console.log(filter);
    if (filter == '') {
      this.shownSkills = new Set(this._allSkills);
    } else {
      const results = this._fuze?.search(filter);
      if (results != undefined) {
        this.shownSkills = new Set(results.map(r => r.item.name));
      } else {
        this.shownSkills = new Set(this._allSkills);
      }
    }
    
  }
}
