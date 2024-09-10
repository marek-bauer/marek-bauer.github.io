import { Component, Type } from '@angular/core';
import { EntropyComponent } from './entropy/entropy.component';
import { ArticleComponent } from '../../components/article/article.component';
import { Route } from '@angular/router';

export type Article = 
  { key: string
  , title: string
  , publicationDate: Date
  , abstract: string
  , tags: Array<string>
  , component: Type<Component>
  }

export const articleList: Array<Article> = 
  [ { key: "what-logarithm-is-doing-in-the-entropy-formula"
    , title: "What logarithm is doing in the entropy formula?"
    , publicationDate: new Date('11 Jul 2024 17:00:00 GMT')
    , component: EntropyComponent 
    , abstract: "Short derivation of information and entropy formulas, based on assumptions what information is."
    , tags: ["Information theory", "Entropy", "Shannon theorem", "Fundamentals", "Encoding"]
    }
  ]

export function articleToRoute(a: Article): Route {
  return {
    path: 'blog/' + a.key,
    component: ArticleComponent,
    data: { key: a.key
          , title: a.title
          , publicationDate: a.publicationDate
          , articleContent: a.component
          , tags: a.tags 
          },
    title: a.title
  }
}