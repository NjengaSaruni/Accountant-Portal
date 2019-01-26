import {DataObject} from '../../charts/models/BaseChart/DataObject';
import {BarChart} from '../../charts/models/BarChart/BarChart';
import {LineChart} from '../../charts/models/LineChart/LineChart';
import {PieChart} from '../../charts/models/PieChart/PieChart';

/**
 * @description
 * A utility method that returns a random integer
 * between min (inclusive) and maxValue (exclusive)
 * generate a random integer between min and maxValue
 * @param min Mininum number exclusive
 * @param max Maximum number exclusive
 * @return random generated integer
 */
export function randomInt(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @description
 * A utility method that returns a random rgba color
 * @param opacity The opacity of the randomly generated color
 * @return random rgba color with specified opacity or 1
 */
export function randomColor(opacity: number = 1) {
  return `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},${opacity})`;
}


export function getMockData(): DataObject[] {
  return [
    new DataObject('Jan', randomInt(1, 10), randomColor()),
    new DataObject('Feb', randomInt(1, 10), randomColor()),
    new DataObject('Mar', randomInt(1, 100), randomColor()),
    new DataObject('Apr', randomInt(1, 100), randomColor()),
    new DataObject('May', randomInt(1, 100), randomColor()),
    new DataObject('Jun', randomInt(1, 100), randomColor()),
    new DataObject('Jul', randomInt(1, 100), randomColor()),
    new DataObject('August', randomInt(1, 100), randomColor()),
    new DataObject('Sep', randomInt(1, 10), randomColor()),
    new DataObject('Oct', randomInt(1, 10), randomColor()),
    new DataObject('Nov', randomInt(1, 10), randomColor()),
    new DataObject('Dec', randomInt(1, 10), randomColor())
  ];
}


export function getMockBarchart(width = 800, height = 400) {
  const barChart = new BarChart(width, height);

  barChart.title = `Bar Graph A`;
  barChart.subtitle = `A graph of weekly expenditure in Kshs`;
  barChart.line.pattern = [15, 3, 3, 3];
  barChart.line.width = 0.3;
  barChart.line.color = '#1945ff';
  // barChart.barPadding = 40;
  barChart.populate(getMockData());
  barChart.backgroundColor = 'rgba(238, 250, 232, 0.3)';
  return barChart;
}

export function getMockLinechart(width = 800, height = 400) {
  const lineChart = new LineChart(width, height);

  lineChart.title = `Bar Graph A`;
  lineChart.subtitle = `A graph of weekly expenditure in Kshs`;
  lineChart.line.width = randomInt(2, 6);
  lineChart.line.color = randomColor();
  lineChart.populate(getMockData());
  lineChart.backgroundColor = 'rgba(238, 250, 232, 0.3)';

  return lineChart;
}

export function getMockPiechart() {
  const piechart = new PieChart(120, 80);

  piechart.title = `Bar Graph A`;
  piechart.subtitle = `A graph of weekly expenditure in Kshs`;
  piechart.populate(getMockData());
  piechart.backgroundColor = 'rgba(238, 250, 232, 0.3)';


  return piechart;
}
