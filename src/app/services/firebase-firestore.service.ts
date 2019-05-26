import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { Image } from '../shared/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService<T> {
  private documentCollection: AngularFirestoreCollection<T>;
  private documents: Observable<T[]>;
  private typeDoc: TypeDoc;

  constructor(private angularFirestore: AngularFirestore) {

    let asd = 'User';
    switch (asd) {
      case 'User':
        this.typeDoc = TypeDoc.User;
        break;
      case 'Image':
        this.typeDoc = TypeDoc.Image;
        break;
      default:
        this.typeDoc = TypeDoc.None;
        break;

    }

    this.documentCollection = angularFirestore.collection<T>(this.typeDoc);
    this.documents = this.documentCollection.valueChanges();
  }

  getDocuments() {
    return this.documents;
  }

  getDocument(id) {
    return this.documentCollection.doc<T>(id).valueChanges();
  }

  updateDocument(document: T, id: string) {
    return this.documentCollection.doc(id).update(document);
  }

  addDocument(document: T) {
    return this.angularFirestore.collection<T>(this.typeDoc).add(document).then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
  }

  removeDocument(id) {
    return this.documentCollection.doc(id).delete();
  }
}

enum TypeDoc {
  User = 'users',
  Image = 'images',
  None = '',

}