import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarchartComponent } from './components/bargraph/barchart.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { LinechartComponent } from './components/linechart/linechart.component';

@NgModule({
  declarations: [BarchartComponent, PiechartComponent, LinechartComponent],
  imports: [
    CommonModule
  ],
  exports: [ BarchartComponent, PiechartComponent, LinechartComponent ]
})
export class ChartsModule { }
