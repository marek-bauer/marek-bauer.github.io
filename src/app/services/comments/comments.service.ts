import { Injectable } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Firestore, addDoc, collection, getCountFromServer, query, getDocs, QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';

type Comment = {
  id: string,
  content: string,
  author: string,
  timestamp: Date,
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
  ) { }

  public async addComment(key: string, content: string): Promise<boolean> {
    const user = this.auth.userUid();
    if (user === null) {
      return false;
    }
    return addDoc(collection(this.firestore, this.fireKeyForUser(key, user)), {
      content: content,
      author: this.auth.userName(),
      timestamp: Date.now()
    }).then(docRef => {
      return true;
    }).catch(error => {
      console.error(error);
      return false;
    })
  }

  private async fetchAllUserComments(key: string, userId: string): Promise<Array<Comment>> {
    const q = query(collection(this.firestore, this.fireKeyForUser(key, userId)));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(this.docToComment)
      .filter((mComment) : mComment is Comment => mComment !== null);
  }

  private async fetchAllComments(key: string): Promise<Array<Comment>> {
    const q = query(collection(this.firestore, this.fireKey(key)));
    const snapshot = await getDocs(q);
    const comments = await Promise.all(
      snapshot.docs
        .map((doc) => doc.id)
        .map((userId) => this.fetchAllUserComments(key, userId))
    );
    return comments.flat();
  }

  private docToComment(doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Comment | null {
    const id: string = doc.id;
    const content: string | undefined = doc.data()['content'];
    const author: string | undefined = doc.data()['author'];
    const timestamp: Date | undefined = doc.data()['timestamp'];
    if (content === undefined || author === undefined || timestamp === undefined) {
      return null;
    }
    else {
      return {
        id: id,
        content: content,
        author: author,
        timestamp: timestamp
      }
    }
  }

  private fireKey(key: string): string {
    return `/comments/article/${key}`
  }

  private fireKeyForUser(key: string, userId: string): string {
    return `/comments/article/${key}/users/${userId}` 
  }
}
