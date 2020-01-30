import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {

  @Input('userData') userData: any;
  constructor() { }

  ngOnInit() {
    console.log('item', this.userData);
  }

}