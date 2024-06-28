import { Component, Type } from '@angular/core';
import { TestComponent } from './test/test.component';
import { ArticleComponent } from '../../components/article/article.component';
import { Route } from '@angular/router';

type Article = 
  { key: string
  , title: string
  , publicationDate: Date
  , abstract: string
  , tags: Array<string>
  , component: Type<Component>
  }

export const articleList: Array<Article> = [
  { key: "test"
  , title: "This is a Test"
  , publicationDate: new Date()
  , component: TestComponent 
  , abstract: "Tis is abstract of a test"
  , tags: ["Marek", "Bauer"]
  }
]

export function articleToRoute(a: Article): Route {
  return {
    path: 'blog/' + a.key,
    component: ArticleComponent,
    data: { key: a.key, title: a.title, publicationDate: a.publicationDate, articleContent: a.component }
  }
}