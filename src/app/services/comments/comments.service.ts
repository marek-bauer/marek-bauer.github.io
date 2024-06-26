import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getCountFromServer, query, getDocs, QueryDocumentSnapshot, DocumentData, Timestamp } from '@angular/fire/firestore';

export type Comment = {
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
    private firestore: Firestore,
  ) { }

  public async addComment(key: string, content: string, author: string): Promise<boolean> {
    return addDoc(collection(this.firestore, this.fireKey(key)), {
      content: content,
      author: author,
      timestamp: Timestamp.now()
    }).then(docRef => {
      return true;
    }).catch(error => {
      console.error(error);
      return false;
    })
  }

  private async fetchComments(key: string): Promise<Array<Comment>> {
    const q = query(collection(this.firestore, this.fireKey(key)));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(this.docToComment)
      .filter((mComment) : mComment is Comment => mComment !== null);
  }

  private async fetchCommentCount(key: string): Promise<number> {
    const coll = collection(this.firestore, this.fireKey(key));
    return getCountFromServer(coll)
      .then(snapshot => snapshot.data().count);
  }

  public async getComments(key: string): Promise<Array<Comment>> {
    return this.fetchComments(key);
  }

  public async countComments (key: string): Promise<number> {
    return this.fetchCommentCount(key);
  }

  private docToComment(doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Comment | null {
    const id: string = doc.id;
    const content: string | undefined = doc.data()['content'];
    const author: string | undefined = doc.data()['author'];
    const timestamp: Timestamp | undefined = doc.data()['timestamp'];
    if (content === undefined || author === undefined || timestamp === undefined) {
      return null;
    }
    else {
      return {
        id: id,
        content: content,
        author: author,
        timestamp: timestamp.toDate()
      }
    }
  }

  private fireKey(key: string): string {
    return `${key}`
  }
}
