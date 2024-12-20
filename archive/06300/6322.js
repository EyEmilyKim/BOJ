// https://www.acmicpc.net/problem/6322
/*
직각 삼각형의 두 변

컴퓨터를 이용하면 수학 계산이 조금 쉬워진다. 다음과 같은 예를 살펴보자. 세 변의 길이가 a, b, c(c는 빗변)이면서 a2+b2=c2를 만족하는 삼각형을 직각삼각형이라고 한다. 이 공식은 피타고라스의 법칙이라고 한다.

직각 삼각형의 두 변의 길이가 주어졌을 때, 한 변의 길이를 구하는 프로그램을 작성하시오.
...


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const tc = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
tc.pop();
// console.log(tc);

// 문제 로직
/**
 * 피타고라스의 정리
 * 직각 삼각형의 세 변 a,b,c 에 대하여
 * a^2 + b^2 = c^2
 */

const result = [];
for (let i = 1; i <= tc.length; i++) {
  let str = 'Triangle #' + i + '\n';
  const [a, b, c] = tc[i - 1];
  let s;
  let x;
  if (c === -1) {
    s = 'c';
    x = Math.sqrt(a ** 2 + b ** 2);
  } else {
    if (a === -1) {
      s = 'a';
      x = Math.sqrt(c ** 2 - b ** 2);
    } else if (b === -1) {
      s = 'b';
      x = Math.sqrt(c ** 2 - a ** 2);
    }
  }

  if (x) str += s + ' = ' + x.toFixed(3);
  else str += 'Impossible.';
  result.push(str);
}

console.log(result.join('\n\n'));

// 실행시간 측정 종료
console.timeEnd(`-----\n`);
