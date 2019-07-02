import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const camelize = (dayType) => {
  if (dayType == 'pre-call') { return 'preCall'; }
  if (dayType == 'post-call') { return 'postCall'; }
  return 'call';
}

const input = new Promise(function(resolve, reject) {
  rl.question('Enter the name of the PGY2: ', (pgy2) => {
    rl.question('Enter the name of the Trauma PGY3: ', (tPgy3) => {
      rl.question('Enter the name of the EGS PGY3: ', (ePgy3) => {
        rl.question('Enter the name of the PGY5: ', (pgy5) => {
          rl.question('Is the first day of the month pre-call, call, or post-call? ', (firstDayType) => {
            const response = {};
            response.pgy2 = pgy2;
            response.traumaPgy3 = tPgy3;
            response.egsPgy3 = ePgy3;
            response.pgy5 = pgy5;
            response.firstDayType = camelize(firstDayType)
            rl.close();
            resolve(response);
          });
        });
      });
    });
  });
});

export default input;