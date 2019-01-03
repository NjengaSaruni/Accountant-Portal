import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BargraphComponent } from './components/bargraph/bargraph.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { LinechartComponent } from './components/linechart/linechart.component';

@NgModule({
  declarations: [BargraphComponent, PiechartComponent, LinechartComponent],
  imports: [
    CommonModule
  ],
  exports: [ BargraphComponent, PiechartComponent, LinechartComponent ]
})
export class GraphsModule { }
