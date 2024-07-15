import { Component, Directive, Input, ContentChildren, QueryList, TemplateRef} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { SkillComponent } from './skill/skill.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import Fuse from 'fuse.js';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[skill]',
  standalone: true,
})
export class Skill{
  @Input() name!: string;
  @Input() lvl!: number;
  @Input() aliases: Array<string> = [];
  @Input() tags: Array<string> = [];

  private _noContent: boolean = false;
  @Input() set noContent (x: BooleanInput) {
    this._noContent = coerceBooleanProperty(x);
  };

  get noContent(): boolean {
    return this._noContent;
  }

  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'category',
  template: '',
  standalone: true,
  imports: [CommonModule]
})
export class Category{
  @Input({required: true}) title!: string;
  @Input({required: true}) skillLevelFn!: (x: number) => string;
  @Input({required: false}) opened: boolean = true;
  @ContentChildren(Skill) skills!: QueryList<Skill>;
}

const fuseOptions = {
	threshold: 0.35,
	keys: [
		"name",
		"aliases",
    "tags"
	]
};

@Component({
  selector: 'search-skills',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, SkillComponent, Category, SearchBarComponent],
  templateUrl: './search-skills.component.html',
  styleUrl: './search-skills.component.scss'
})
export class SearchSkillsComponent {
  @ContentChildren(Category) categories!: QueryList<Category>;
  suggestions: Array<{name: string, aliases: Array<string>}> = [];
  shownSkills: Set<string> = new Set();
  nonEmptyCategories: Set<string> = new Set();

  private _fuze: Fuse<{ name: string, category: string, aliases: string[], tags: string[] }> | undefined;
  private _allSkills: Array<string> = [];
  private _allCategories: Array<string> = [];

  private _search: string = "";

  set search(newSearch: string) {
    this._search = newSearch;
    if (newSearch == '') {
      this.shownSkills = new Set(this._allSkills);
      this.nonEmptyCategories = new Set(this._allCategories);
    } else {
      const results = this._fuze?.search(newSearch);
      if (results != undefined) {
        this.shownSkills = new Set(results.map(r => r.item.name));
        this.nonEmptyCategories = new Set(results.map(r => r.item.category));
      } else {
        this.shownSkills = new Set(this._allSkills);
        this.nonEmptyCategories = new Set(this._allCategories);
      }
    }
  }

  get search(): string {
    return this._search;
  }

  ngAfterContentInit(): void {
    const categories = this.categories.toArray();
    const tags = categories.flatMap(c => c.skills.toArray().flatMap(s => s.tags));
    const uniqueTags = [...new Set(tags)];
    const skills = categories.flatMap(c => c.skills.toArray())
    this.suggestions = [...skills.map(s => ({name: s.name, aliases: s.aliases})),  
                        ...uniqueTags.map(t => ({name: t, aliases: [t]}))];

    const skillFuze = categories.flatMap(c =>
      c.skills.toArray().map(s => ({name: s.name, category: c.title, aliases: s.aliases, tags: s.tags}))
    );
    this._allCategories = categories.map(s => s.title);
    this._allSkills = skills.map(s => s.name);
    this.shownSkills = new Set(this._allSkills);
    this._fuze = new Fuse(skillFuze, fuseOptions);
  }

  selectedTag(tag: string):void {
    this.search = tag;
  }

  isCategoryHidden(cat: Category): boolean {
    return false;
  }
}
