Date.prototype.incrementDay = function() {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + 1);
  return date;
}

const dayOfWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

export default dayOfWeek;