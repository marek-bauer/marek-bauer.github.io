import { Component, Input } from '@angular/core';
import { CommentsService, Comment } from '../../services/comments/comments.service';
import { ButtonComponent } from "../button/button.component"
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'comment-section',
  standalone: true,
  imports: [ButtonComponent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent {
  @Input({required: true}) key!: string;
  comments: Array<Comment> | undefined;
  private _sendingComment: boolean = false;

  get sendingComment(): boolean {
    return this._sendingComment;
  }

  set sendingComment(newState: boolean) {
    this._sendingComment = newState;
    if (newState === true) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  formControl = new FormGroup({
    author: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  });

  constructor (private commentService: CommentsService) { }

  cancelComment(): void {
    this.formControl.reset();
    this.formControl.controls.author.setErrors(null);
    this.formControl.controls.comment.setErrors(null);
  }

  async sendComment(): Promise<void> {
    const author: string | null = this.formControl.controls.author.value
    const content: string | null = this.formControl.controls.comment.value
    if (!this.formControl.valid || author === null || content === null) {
      console.log("Comment not added");
      return;
    }
    this.sendingComment = true;
    if (await this.commentService.addComment(this.key, content, author)) {
      await this.refreshComments();
      this.formControl.reset();
    } else {
      this.formControl.controls.comment.setErrors({ couldNotSend: true });
    }
    this.sendingComment = false;
  }

  dateOptions : Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: false
  };

  async refreshComments(): Promise<void> {
    const comments = await this.commentService.getComments(this.key);
    this.comments = comments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async ngAfterContentInit() {
    this.refreshComments();
  }
}
