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

//console.log(data);
  // END
}