// https://www.acmicpc.net/problem/25024
/*
시간과 날짜

어느 날 시계를 본 경근이는 시간이 8시 14분인 것을 보고 놀랐다. 왜냐하면 그의 생일은 8월 14일이기 때문이다. 그리고 이 경험을 바탕으로 다음과 같은 문제를 만들었다:

두 정수 x, y가 주어질 때, x시 y분으로 읽는 것이 가능한지의 여부를 판단하면서, x월 y일로 읽는 것이 가능한지의 여부를 판단하는 프로그램을 작성하라.

시는 0시에서 23시까지, 분은 0분에서 59분까지가 유효하며, 월은 1월에서 12월까지가 유효하다. 1월, 3월, 5월, 7월, 8월, 10월, 12월은 1일에서 31일까지가 유효하고, 4월, 6월, 9월, 11월은 1일에서 30일까지가 유효하며, 2월은 1일에서 29일까지가 유효하다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(input);

// 문제 로직
// 단위 별 유효숫자 min, max 딕셔너리
const valid = {
  hour: [0, 23],
  min: [0, 59],
  month: [1, 12],
  day29: [1, 29],
  day30: [1, 30],
  day31: [1, 31],
};
// 해당월의 유효 날짜 min,max 반환하는 함수
function getMonthDays(n) {
  if (n === 2) return valid['day29'];
  // const month31 = new Set([1, 3, 5, 7, 8, 10, 12]);
  const month30 = new Set([4, 6, 9, 11]);
  if (month30.has(n)) return valid['day30'];
  else return valid['day31'];
}

// 작업 수행
const result = [];
input.forEach((i) => {
  const [x, y] = i.split(' ').map(Number);
  // 시간 유효 ?
  let timeOk = 'No';
  if (
    valid['hour'][0] <= x &&
    x <= valid['hour'][1] &&
    valid['min'][0] <= y &&
    y <= valid['min'][1]
  )
    timeOk = 'Yes';
  // 날짜 유효 ?
  let dateOk = 'No';
  if (valid['month'][0] <= x && x <= valid['month'][1]) {
    const validDay = getMonthDays(x);
    if (validDay[0] <= y && y <= validDay[1]) dateOk = 'Yes';
  }
  // console.log([x, y], timeOk, dateOk);
  result.push(`${timeOk} ${dateOk}`);
});
console.log(result.join('\n'));
