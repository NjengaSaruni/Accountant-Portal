import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BargraphComponent } from './components/bargraph/bargraph.component';
import { PiechartComponent } from './components/piechart/piechart.component';

@NgModule({
  declarations: [BargraphComponent, PiechartComponent],
  imports: [
    CommonModule
  ],
  exports: [ BargraphComponent, PiechartComponent ]
})
export class GraphsModule { }
