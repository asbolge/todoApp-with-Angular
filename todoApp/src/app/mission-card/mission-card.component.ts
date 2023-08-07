import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.css']
})
export class MissionCardComponent implements OnInit {

  @Input() title:string = '';
  @Input() category:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
