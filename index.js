import _ from 'lodash';

export default function solution(content){
  // BEGIN
const correctedContent = content
  .split('\n')
  .map((line) => line.replace('\r', ''))
  .filter((line) => line !== '');

const keys = correctedContent[0]
  .split(',')
  .map((key) => key.replace(' ', '_'));

const data = correctedContent
  .slice(1)
  .map((line) => {
    const values = line.split(',');
    const obj = keys.reduce((acc, key, i) => {
      const value = values[i] || '';
      acc[key] = value;
      return acc;
    },{});
  return obj;
});

console.log(`Count: ${data.length}`);

const cities = _.uniq(
  data
    .map((obj) => obj.City)
    .sort())
  .join(', ');
  

console.log(`Cities: ${cities}`);

const minHum = data.sort((a, b) => a.Humidity - b.Humidity)[0].Humidity;
const maxHum = data.sort((a, b) => b.Humidity - a.Humidity)[0].Humidity;

console.log(`Humidity: Min: ${minHum}, Max: ${maxHum}`);

const maxTempDay = data.sort((a, b) => b.Max_Temperature - a.Max_Temperature)[0];

console.log(`HottestDay: ${maxTempDay.Date} ${maxTempDay.City}`)

const citiesGroupData = data
  .reduce((acc, obj) => {
    if (acc[obj.City]) {
      acc[obj.City].dayCounter += 1;
      acc[obj.City].tempSum += Number(obj.Max_Temperature);
    } else {
      acc[obj.City] = { dayCounter: 1, tempSum: Number(obj.Max_Temperature) }
    }
    return acc;
  }, {});

let avgTempByCities = [];
for (const city in citiesGroupData) {
  const avg = citiesGroupData[city].tempSum / citiesGroupData[city].dayCounter;
  avgTempByCities.push({ city, avg })
}
const hottestCity = avgTempByCities.sort((a, b) => b.avg - a.avg)[0];
//console.log(avgTempByCities);
console.log(`HottestCity: ${hottestCity.city}`);
  // END
}