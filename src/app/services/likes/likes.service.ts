import { Injectable, Inject } from '@angular/core';
import { Firestore, addDoc, collection, getCountFromServer, query, getDocs } from '@angular/fire/firestore';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Expiable } from '../../utils/expiable'

const LIKES_TTL = 60 * 60 // 1h

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likesList: { [key: string] : Expiable<number> } = {}

  constructor(
    private firestore: Firestore,
    @Inject(LOCAL_STORAGE) private webStorage: StorageService,
  ) { }

  public isLiked(key: string): boolean {
    if (this.webStorage.has(`like-${key}`)) {
      return true;
    } else {
      return false;
    }
  }

  public async like(key: string): Promise<boolean> {
    if (this.isLiked(key)) {
      return true;
    }
    return addDoc(collection(this.firestore, this.fireKey(key)), {
      timestamp: Date.now()
    }).then(docRef => {
      this.webStorage.set(`like-${key}`, docRef.id);
      return true;
    }).catch(error => {
      console.error(error);
      return false;
    })
  }

  private fireKey(key: string): string {
    return `/likes/article/${key}`
  }

  private async calculateLikes(key: string): Promise<number> {
    const coll = collection(this.firestore, this.fireKey(key));
    return getCountFromServer(coll)
      .then(snapshot => snapshot.data().count);
  }

  public async getLike(key: string): Promise<{all: number, user: boolean}> {
    if (!(key in this.likesList)) {
      this.likesList[key] = new Expiable(LIKES_TTL, () => this.calculateLikes(key))
    }
    return {
      all: await this.likesList[key].get(),
      user: this.isLiked(key)
    };
  }

  public async getLikes(keys: Array<string>): Promise<{[key: string] : {all: number, user: boolean}}> {
    let result: {[key: string] : {all: number, user: boolean}} = {}
    for (let key of keys) {
      result[key] = await this.getLike(key);
    } 
    return result;
  }
}
