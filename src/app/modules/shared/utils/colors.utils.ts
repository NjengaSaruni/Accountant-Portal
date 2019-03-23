export function invertColor(color, bw) {
  if (color.indexOf('#') === 0) {
    color = color.slice(1);
  }
  // convert 3-digit color to 6-digits.
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  let r = parseInt(color.slice(0, 2), 16);
  let g = parseInt(color.slice(2, 4), 16);
  let b = parseInt(color.slice(4, 6), 16);

  if (color.length !== 6) {
    let rbg_color = color.split('(');
    rbg_color = rbg_color[1].split(',');
    r = parseInt(rbg_color[0], 10);
    g = parseInt(rbg_color[1], 10);
    b = parseInt(rbg_color[2], 10);
  }



  if (bw) {
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  const rstring = (255 - r).toString(16);
  const gstring = (255 - g).toString(16);
  const bstring = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(rstring) + padZero(gstring) + padZero(bstring);
}

function padZero(str, len =  2) {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
