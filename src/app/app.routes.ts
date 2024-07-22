import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CvComponent } from './pages/cv/cv.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { articleList, articleToRoute } from "./pages/articles/articles-list"
import { BlogComponent } from "./pages/blog/blog.component"
import { NotFoundComponent } from "./pages/not-found/not-found.component"

export const mainRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cv', component: CvComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'blog', component: BlogComponent }
  ];

export const routes: Routes = 
  [ ...mainRoutes
  , ...articleList.map(articleToRoute)
  , {path: "**", component: NotFoundComponent}
  ];
