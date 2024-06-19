import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider, User } 
  from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  public user(): User | null {
    return this.auth.currentUser;
  }

  public userUid(): string | null {
    const user = this.user()
    if (user === null) {
      return null;
    }
    return user.uid;
  }

  public userName(): string | null {
    const user = this.user()
    if (user === null) {
      return null;
    }
    if (user.displayName !== null) {
      return user.displayName;
    } else if (user.email !== null) {
      return user.email;
    } else {
      return null
    }
  }

  public logInGoogle(): void {
    console.log('login google')
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public logInGithub(): void {
    signInWithPopup(this.auth, new GithubAuthProvider());
  }

  public logInEmail(): void {
    signInWithPopup(this.auth, new EmailAuthProvider());
  }

  public logout(): void {
    this.auth.signOut();
  }
}
