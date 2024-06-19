import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CvComponent } from './pages/cv/cv.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { TestAuthComponent } from './test-auth/test-auth.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cv', component: CvComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'test', component: TestAuthComponent },
];
