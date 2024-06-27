import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { LikesService } from '../services/likes/likes.service';
import { CommentsService } from "../services/comments/comments.service";
import { LikeButtonComponent } from "../components/like-button/like-button.component";
import { CommentSectionComponent } from '../components/comment-section/comment-section.component';
import { EqComponent } from "../components/eq/eq.component"

@Component({
  selector: 'app-test-auth',
  standalone: true,
  imports: [LikeButtonComponent, CommentSectionComponent, EqComponent],
  templateUrl: './test-auth.component.html',
  styleUrl: './test-auth.component.scss'
})
export class TestAuthComponent {
  constructor (
    public auth: AuthService, 
    public likes: LikesService,
    public comments: CommentsService) {
  }

}
