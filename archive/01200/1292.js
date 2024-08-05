// https://www.acmicpc.net/problem/1292
/*
쉽게 푸는 문제

동호는 내년에 초등학교를 입학한다. 그래서 동호 어머니는 수학 선행 학습을 위해 쉽게 푸는 문제를 동호에게 주었다.

이 문제는 다음과 같다. 1을 한 번, 2를 두 번, 3을 세 번, 이런 식으로 1 2 2 3 3 3 4 4 4 4 5 .. 이러한 수열을 만들고 어느 일정한 구간을 주면 그 구간의 합을 구하는 것이다.

하지만 동호는 현재 더 어려운 문제를 푸느라 바쁘기에 우리가 동호를 도와주자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [A, B] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(A, B);

// 문제 로직
let arr = [0];
let num = 1;
let cnt = 0;
while (arr.length <= B) {
  arr.push(num);
  cnt++;
  if (cnt === num) {
    num++;
    cnt = 0;
  }
}
// console.log(arr);
console.log(arr.slice(A, B + 1).reduce((a, b) => a + b, 0));
