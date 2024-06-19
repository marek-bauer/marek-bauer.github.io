import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { LikesService } from '../services/likes/likes.service';
import { CommentsService } from "../services/comments/comments.service";

@Component({
  selector: 'app-test-auth',
  standalone: true,
  imports: [],
  templateUrl: './test-auth.component.html',
  styleUrl: './test-auth.component.scss'
})
export class TestAuthComponent {
  constructor (
    public auth: AuthService, 
    public likes: LikesService,
    public comments: CommentsService) {
  }

  async likeTest() {
    this.likes.like("test1");
  }

  async getLikes() {
    console.log(await this.likes.getLike("test1"))
  }

  async addComments() {
    this.comments.addComment("test", 'this is test comment')
  }

  login() {
    this.auth.logInGoogle();
  }

  logout() {
    this.auth.logout();
  }
}
