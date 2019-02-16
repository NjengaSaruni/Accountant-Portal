import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IReportCard} from '../../models/ReportCard.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() config$: Observable<IReportCard>;
  constructor() { }

  ngOnInit() {
    // console.log(this.config);
  }

  ngOnChanges(changes: SimpleChanges) {
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

  }

}
