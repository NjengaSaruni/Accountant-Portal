import {Component, OnInit} from '@angular/core';
import {BarGraph} from '../../../common/models/graphs/BarChart/BarGraph';
import {randomColor, randomInt} from '../../../common/utils/randomInt';
import {Bar} from '../../../common/models/graphs/BarChart/Bar';
import {PieChart} from '../../../common/models/graphs/PieChart/PieChart';
import {PieDataObject} from '../../../common/models/graphs/PieChart/PieDataObject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  graphs: BarGraph[] = [];
  pieChart: PieChart;
  constructor() { }

  async ngOnInit() {
    this.graphs.push(new BarGraph());
    const graph = this.graphs[0];
    graph.title = `Bar Graph A`;
    graph.subtitle = `A graph of weekly expenditure in Kshs`;

    graph.line.pattern = [15, 3, 3, 3];
    graph.line.width = 0.3;
    graph.line.color = '#1945ff';

    // graph.backgroundColor = '#2c2c2c';
    for (let i = 1; i <= 6; i++) {
      const w = 800 / 10;
      // TODO debug effect of random height on bar display
      const bar: Bar = new Bar(randomInt(0, 700), w);
      bar.title = `Bar ${i}`;
      graph.add(bar);
    }

    const graph1 = new BarGraph();
    this.graphs.push(graph1);
    graph1.title = `Bar Graph B`;
    graph1.subtitle = `A graph of monthly expenditure in Kshs`;
    graph1.line.pattern = [4, 8];
    for (let i = 1; i <= 12; i++) {
      const w = 800 / 10;
      const bar: Bar = new Bar(randomInt(0, 300), w);
      bar.title = `Bar ${i}`;
      graph1.add(bar);
    }

    this.pieChart = new PieChart(80, 50);
    this.pieChart.title = 'A simple pie chart';
    this.pieChart.unit = 'KES';
    this.pieChart.populate([
      new PieDataObject('Animals', randomInt(1, 400), randomColor()),
      new PieDataObject('Birds', randomInt(1, 200), randomColor()),
      new PieDataObject('Python', randomInt(1, 10), randomColor()),
      new PieDataObject('Dinosaurs', randomInt(1, 10), randomColor()),
      new PieDataObject('Elephants', randomInt(1, 10), randomColor()),
      // new PieDataObject('Fish', randomInt(1, 10), randomColor()),
      // new PieDataObject('Girrafes', randomInt(1, 10), randomColor()),
      // new PieDataObject('Hyena', randomInt(1, 10), randomColor()),
      // new PieDataObject('Iguanas', randomInt(1, 10), randomColor()),
      // new PieDataObject('Jaguars', randomInt(1, 10), randomColor()),
      // new PieDataObject('Koalas', randomInt(1, 10), randomColor())
    ]);

    console.log(this.pieChart.size());
  }

}


