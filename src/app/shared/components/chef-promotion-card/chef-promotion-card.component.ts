import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chef-promotion-card',
  templateUrl: './chef-promotion-card.component.html',
  styleUrls: ['./chef-promotion-card.component.scss']
})
export class ChefPromotionCardComponent implements OnInit {
  @Input() urlBanner: string;
  @Input() chefName: string;
  @Input() urlProfilePhoto: string;
  @Input() score: number;

  constructor() {

  }

  ngOnInit() { }
}
