/**
 * @description
 * A utility method that returns a random integer
 * between min (inclusive) and max (exclusive)
 * generate a random integer between min and max
 * @param min Mininum number exclusive
 * @param max Maximum number exclusive
 * @return random generated integer
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomColor() {
  return `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.9)`;
}
