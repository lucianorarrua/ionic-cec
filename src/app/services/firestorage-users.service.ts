import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestorageUsersService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('users');
    this.users = this.userCollection.valueChanges();
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(user: User, id: string) {
    return this.userCollection.doc(id).update(user);
  }

  addUser(user: User) {
    return this.afs.collection<User>('users').add(user).then((res) => {
      return res;
    }).catch((err) => {
      return err;
    });
  }

  removeUser(id) {
    return this.userCollection.doc(id).delete();
  }
}