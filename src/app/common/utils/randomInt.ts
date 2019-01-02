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
