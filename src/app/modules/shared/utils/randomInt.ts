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
    new DataObject('Jan', randomInt(9000, 10000), randomColor()),
    new DataObject('Feb', randomInt(9000, 12000), randomColor()),
    new DataObject('Mar', randomInt(9000, 12000), randomColor()),
    new DataObject('Apr', randomInt(9000, 12000), randomColor()),
    new DataObject('May', randomInt(9000, 12000), randomColor()),
    new DataObject('Jun', randomInt(9000, 10000), randomColor()),
    new DataObject('Jul', randomInt(9000, 10000), randomColor()),
    new DataObject('Aug', randomInt(9000, 10000), randomColor()),
    new DataObject('Sep', randomInt(9000, 10000), randomColor()),
    new DataObject('Oct', randomInt(9000, 10000), randomColor()),
    new DataObject('Nov', randomInt(9000, 15000), randomColor()),
    new DataObject('Dec', 18000, randomColor())
  ];
}

export function getMockPieData(): DataObject[] {
  return [
    new DataObject('SHOPPING', randomInt(9000, 10000), randomColor()),
    new DataObject('UBER', randomInt(9000, 12000), randomColor()),
    new DataObject('RENT', randomInt(9000, 12000), randomColor()),
    new DataObject('FARE', randomInt(9000, 12000), randomColor()),
    new DataObject('SCHOOL FEES', 27000, randomColor()),
    new DataObject('FOOD', 12430, randomColor())
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
  return barChart;
}

export function getMockLinechart(width = 800, height = 400) {
  const lineChart = new LineChart(width, height);

  lineChart.title = `Your savings per month in the past twelve months`;
  lineChart.subtitle = `Trend in savings per month in Kshs`;
  lineChart.line.width = randomInt(2, 6);
  lineChart.line.color = randomColor();

  return lineChart;
}

export function getMockPiechart() {
  const piechart = new PieChart(120, 80);

  piechart.title = `Expenses in January 2018`;

  return piechart;
}
