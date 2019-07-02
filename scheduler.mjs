import inputPromise from './schedule-questions';
import dayOfWeek from './date-helpers';

// inputPromise.then((inputs) => {
//   const schedule = scheduleInitialSetup(inputs.firstDayType)
//   const scheduleWithQiAndConference = addQiAndConference(schedule, inputs.traumaPgy3, inputs.egsPgy3);
//   console.log(scheduleWithQiAndConference);
// });


const scheduleInitialSetup = (firstDayType) => {
  const map = new Map();
  const d = new Date();
  const nextMonth = d.getMonth() + 1;
  let scheduleDay = new Date(d.getFullYear(), nextMonth, 1);
  let nextDayType = firstDayType;
  const dayTypeFlow = { preCall: 'call', call: 'postCall', postCall: 'preCall' };

  while (scheduleDay.getMonth() == nextMonth) {
    const dayDetails = {
      dayOfWeek: dayOfWeek[scheduleDay.getDay()],
      type: nextDayType,
      events: [],
      residents: [],
      off: []
    };
    switch(dayOfWeek[scheduleDay.getDay()]) {
      case 'Monday': { dayDetails.events.push('EGS QI'); break; }
      case 'Tuesday': { dayDetails.events.push('Trauma QI'); break; }
      case 'Wednesday': { dayDetails.events.push('Conference'); break; }
      case 'Friday': { dayDetails.events.push('Trauma Conference'); break; }
    }
    if (nextDayType == 'preCall'
      && ['Tuesday', 'Thursday', 'Friday'].includes(dayOfWeek[scheduleDay.getDay()])) {
        dayDetails.events.push('Clinic');
    }
    map.set(scheduleDay.getDate(), dayDetails);
    scheduleDay = scheduleDay.incrementDay();
    nextDayType = dayTypeFlow[nextDayType];
  }
  return map;
}

const processQiAndConferences = (schedule, inputs) => {
  schedule.forEach((value, _) => {
    if (value.type == 'preCall') {
      if (value.dayOfWeek == 'Monday') { value.residents.push(inputs.epgy3) }
      if (value.dayOfWeek == 'Tuesday') { value.residents.push(inputs.tpgy3) }
      if (value.dayOfWeek == 'Friday') { value.residents.push(inputs.tpgy3) }
    }
  })
  return schedule;
}

const callDays = (schedule) => {
  const callDays = schedule.map((value, _) => {
    if (value.type == 'call') { return value; }
  })
  return callDays;
}

const inputs = {}
inputs.pgy2 = 'p2';
inputs.traumaPgy3 = 'tp3';
inputs.egsPgy3 = 'ep3';
inputs.pgy5 = 'p5';
inputs.firstDayType = 'call';
const schedule = scheduleInitialSetup(inputs.firstDayType);
const scheduleWithWeekdays = processQiAndConferences(schedule, inputs);

const justCallDays = callDays(scheduleWithWeekdays);
console.log(justCallDays);



// object structure: Pre/Post/Call, Extra, D1, D2, D3