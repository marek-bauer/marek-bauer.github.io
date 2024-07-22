import { Component } from '@angular/core';
import { articleList, Article } from '../articles/articles-list';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ListPositionComponent } from "../../components/list-position/list-position.component"
import { CommentsService } from '../../services/comments/comments.service';
import { TypedTextComponent } from '../../components/typed-text/typed-text.component';

import Fuse from 'fuse.js';

type ArticleHeader = 
  { comments?: number
  } & Article

type ArticleSearchData = {key: string, title: string, abstract: string, tags: Array<string>}

const articleSearchData: Array<ArticleSearchData>
  = articleList.map(x => ({key: x.key, title: x.title, abstract: x.abstract, tags: x.tags}));


function listToDict<V>(x: Array<[string, V]>) : { [id: string]: V } {
  let res: { [id: string]: V } = {};
  for (let [key, value] of x) {
    res[key] = value;
  }
  return res;
}


const fuseOptions = {
  threshold: 0.5,
  keys: [
    "title",
    "abstract",
    "tags"
  ]
};
  
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [SearchBarComponent, ListPositionComponent, ListPositionComponent, TypedTextComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  articles: Array<ArticleHeader> = articleList;
  shownArticles: Set<string> = new Set(articleList.map(x => x.key));
  suggestions: Array<{name: string, aliases: Array<string>}> 
    = [ ...articleList.map(x => ({name: x.title, aliases: []}))
      , ...articleList.flatMap(x => x.tags.map(t => ({name: t, aliases: []})))
      ];

  private _search: string = "";

  set search(newSearch: string) {
    this._search = newSearch;
    if (newSearch == '') {
      this.shownArticles = new Set(articleList.map(x => x.key));
    } else {
      const result = this._fuze.search(newSearch);
      this.shownArticles = new Set(result.map(r => r.item.key));
    }
  }

  get search(): string {
    return this._search;
  }

  private _fuze: Fuse<ArticleSearchData> = new Fuse(articleSearchData, fuseOptions);

  constructor (
    private _router: Router,
    private _comments: CommentsService
  ) { }

  async ngOnInit() {
    const commentCount = await this._comments.countAllComments(this.articles.map(x => x.key));
    this.articles = this.articles.map(x => ({...x, comments: commentCount[x.key]}))
  }

  navigateTo(articleKey: string): void {
    this._router.navigateByUrl('blog/' + articleKey);
  }

  selectedTag(tag: string): void {
    this.search = tag;
  }
}
