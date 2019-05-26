import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  profilePhoto: string;
  userData: User;
  authUser: any;

  constructor(
    private authService: AuthenticationService,
    private readonly afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.initPropertyData();
  }

  private initPropertyData() {
    let usersCollection: AngularFirestoreCollection<User>;
    let users: Observable<User[]>;

    this.authUser = { email: ' ' };
    usersCollection = this.afs.collection<User>('users');
    users = usersCollection.valueChanges();
    this.profilePhoto = '../../../../assets/avatars/grandmother.svg';
    this.userData = new User('', '', '', 5.0, null);
    this.authService.currentUser().then(stringAuthUser => {
      this.authUser = JSON.parse(stringAuthUser);
      users.subscribe(users => {
        this.userData = users.find(user => user.uid === this.authUser.uid);
        this.profilePhoto = this.userData.profilePhoto.url;
      });
    });
  }

  onClick() {

  }
}
