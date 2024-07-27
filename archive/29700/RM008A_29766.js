// https://www.acmicpc.net/problem/29766
/*
DKSH 찾기

학교의 로고인 DKSH는 Dankook University Software High School의 약자이다.
D, K, S, H로만 이루어진 문자열이 주어진다. 이 문자열에서 DKSH가 몇 번 나타나는지 구해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
let cnt = 0;
const len = input.length;
for (let i = 0; i <= len - 4; i++) {
  const str = input.slice(i, i + 4);
  if (str === 'DKSH') cnt++;
}
console.log(cnt);
