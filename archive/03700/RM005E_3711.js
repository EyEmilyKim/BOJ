// https://www.acmicpc.net/problem/3711
/*
학번

Z 대학교 학생은 입학할 때 학번을 받게 된다. 학번은 0보다 크거나 같고, 106-1보다 작거나 같은 정수이다. Z 대학의 김상근 교수는 학번으로 학생들을 구분한다. 상근이는 학생들을 조금 더 쉽게 기억하기 위해서 자신이 가르치는 학생들의 학번을 m으로 나누었을 때, 나머지가 모두 다른 가장 작은 양의 정수를 찾으려고 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
let N = +input.shift();
const test = [];
while (N--) {
  let G = +input.shift();
  const tmp = [];
  while (G--) tmp.push(+input.shift());
  test.push(tmp);
}
// console.log(test);

// 문제 로직
const result = [];
for (const t of test) {
  const len = t.length;
  let m = 1;
  while (true) {
    let set = new Set(t.map((num) => num % m));
    if (set.size === len) break;
    m++;
  }
  result.push(m);
}
console.log(result.join('\n'));
