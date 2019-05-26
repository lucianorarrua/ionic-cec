import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticationService } from 'src/app/services/firebase-authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  user: firebase.User;


  constructor(private firebaseAuthenticationService: FirebaseAuthenticationService) { }

  ngOnInit() {

  }

}
