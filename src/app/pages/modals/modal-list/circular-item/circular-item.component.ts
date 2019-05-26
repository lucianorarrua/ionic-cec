import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circular-item',
  templateUrl: './circular-item.component.html',
  styleUrls: ['./circular-item.component.scss'],
})
export class CircularItemComponent implements OnInit {

  @Input() img: string;
  @Input() textImg: string;

  constructor() { }

  ngOnInit() {
  }

}
