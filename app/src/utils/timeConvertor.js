export function timeToMinutes(time) {
  const [hours, minutes] = time.split(":");
  return hours * 60 + minutes;
}

export function minutesToTime(minutes) {
  const time = [Math.floor(minutes / 60), minutes % 60];
  return time.map(element => {
    if (String(element).length === 2) {
      return element;
    }
    return `0${element}`;
  }).join(":");
}

