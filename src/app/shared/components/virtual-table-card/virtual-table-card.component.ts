import { Component, OnInit, Input } from '@angular/core';
import { VirtualTable } from '../../models/virtual-table.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-virtual-table-card',
  templateUrl: './virtual-table-card.component.html',
  styleUrls: ['./virtual-table-card.component.scss'],
})
export class VirtualTableCardComponent implements OnInit {
  @Input() virtualTable: VirtualTable;
  public chefData: User;


  constructor(
    private authService: AuthenticationService,
    private readonly afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.initPropertyData();
  }

  private initPropertyData() {
    let users: Observable<User[]>;
    users = this.afs.collection<User>('users').valueChanges();
    this.chefData = new User('', '', '', 5.0, null);
    this.authService.currentUser().then(stringAuthUser => {
      users.subscribe(usersData => {
        this.chefData = usersData.find(user => user.uid === this.virtualTable.chefUid);
      });
    });
  }
}
