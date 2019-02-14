import {Component, Input, OnInit} from '@angular/core';
import {IReportCard} from '../../models/ReportCard.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() config: IReportCard;
  constructor() { }

  ngOnInit() {
    console.log(this.config);
  }

}
