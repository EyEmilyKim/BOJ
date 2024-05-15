// https://www.acmicpc.net/problem/4153
/*
직각삼각형

과거 이집트인들은 각 변들의 길이가 3, 4, 5인 삼각형이 직각 삼각형인것을 알아냈다. 주어진 세변의 길이로 삼각형이 직각인지 아닌지 구분하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);
input.pop();

// 문제 로직
input.forEach((i) => {
  const arr = i.trim().split(' ');
  arr.sort((a, b) => a - b);
  const [a, b, c] = arr;
  if (a ** 2 + b ** 2 === c ** 2) console.log('right');
  else console.log('wrong');
});
