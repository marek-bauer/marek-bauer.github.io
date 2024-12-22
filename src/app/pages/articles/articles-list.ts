import { Component, Type } from '@angular/core';
import { EntropyComponent } from './entropy/entropy.component';
import { GranularEffectTypeClassesComponent } from './granular-effect-type-classes/granular-effect-type-classes.component';
import { ApplicativeBatchingComponent } from './applicative-batching/applicative-batching.component';
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
  , { key: "fun-with-applicative-batching"
    , title: "Fun with Applicative - Batching"
    , publicationDate: new Date('1 Oct 2024 17:00:00 GMT')
    , component: ApplicativeBatchingComponent 
    , abstract: "Explores the distinctions between applicative functors and monads in Haskell, emphasizing the benefits of using applicatives for batching queries without interdependencies. It demonstrates how to implement batching with applicative functors, and Fetch monad."
    , tags: ["Applicative", "Haskell", "Functional Programming", "Batching", "Fetch"]
    }
  , { key: "the-case-for-granular-effect-type-classes"
    , title: "The case for granular effect monad type classes"
    , publicationDate: new Date('22 Dec 2024 17:00:00 GMT')
    , component: GranularEffectTypeClassesComponent 
    , abstract: "This article explores granular effect monad type classes in Haskell, highlighting their advantages over the traditional MonadIO approach. Granular effect monad type classes support single effects, making code more predictable and maintainable. The article discusses the limitations of MonadIO, benefits of granular effect monad type classes for code optimization, and the importance of explicit effect handling."
    , tags: ["Haskell", "Functional Programming", "Code Optimization", "Code Optimization", "Testing", "Type Classes"]
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