// https://www.acmicpc.net/problem/11005
/*
진법 변환 2

10진법 수 N이 주어진다. 이 수를 B진법으로 바꿔 출력하는 프로그램을 작성하시오.

10진법을 넘어가는 진법은 숫자로 표시할 수 없는 자리가 있다. 이런 경우에는 다음과 같이 알파벳 대문자를 사용한다.

A: 10, B: 11, ..., F: 15, ..., Y: 34, Z: 35

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, B] = require('fs').readFileSync(path).toString().trim().split(' ');
// console.log(N, B);

//문제 로직 - 방법 1 : 직접 계산하여 구하는 방식

// 알파벳 숫자 치환 메서드
const apb = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const num = [];
for (let n = 10; n <= 35; n++) num.push(n);
// console.log(apb);
// console.log(num);
const codeNum = (n) => {
  if (n >= 10) return apb[num.indexOf(n)];
  else return n;
};

// B진법 수의 총 자리수 구하기
let maxDigit = 1;
while (Math.pow(B, maxDigit) <= N) {
  maxDigit++;
}
// console.log(maxDigit);

// B진법으로 바꾸기
let target = N;
const moks = [];
for (let n = maxDigit - 1; n >= 0; n--) {
  const divider = B ** n;
  const mok = Math.floor(target / divider);
  target -= mok * divider;
  // console.log(n, mok, target);
  moks.push(codeNum(mok));
}
console.log(moks.join(''));

//문제 로직 - 방법 2
console.log(Number(N).toString(B).toUpperCase());

/**
 * toString() 
 : 인자로 진법 수를 전달하면 해당 진법으로 숫자를 변환하여 표기함
 */
