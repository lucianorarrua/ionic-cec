import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  constructor(
    private afStorage: AngularFireStorage
  ) { }

  getDownloadURL(path: string) {
    return this.afStorage.ref(path).getDownloadURL();
  }

  uploadToStorage(data: any, path: string): AngularFireUploadTask {
    const name = `${new Date().getTime()}`;
    return this.afStorage.ref(`${path}/${name}`).putString(data, 'data_url');
  }

  deleteFromStorage(fullPath: string): Observable<any> {
    return this.afStorage.ref(fullPath).delete();
  }
}
