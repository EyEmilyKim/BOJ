// https://www.acmicpc.net/problem/11576
/*
Base Conversion

타임머신을 개발하는 정이는 오랜 노력 끝에 타임머신을 개발하는데 성공하였다. 미래가 궁금한 정이는 자신이 개발한 타임머신을 이용하여 500년 후의 세계로 여행을 떠나게 되었다. 500년 후의 세계에서도 프로그래밍을 하고 싶었던 정이는 백준 사이트에 접속하여 문제를 풀기로 하였다. 그러나 미래세계는 A진법을 사용하고 있었고, B진법을 사용하던 정이는 문제를 풀 수가 없었다. 뛰어난 프로그래머였던 정이는 A진법으로 나타낸 숫자를 B진법으로 변환시켜주는 프로그램을 작성하기로 하였다.

N진법이란, 한 자리에서 숫자를 표현할 때 쓸 수 있는 숫자의 가짓수가 N이라는 뜻이다. 예를 들어 N이 17일 때 한 자릿수에서 사용할 수 있는 수는 0, 1, 2, ... , 16으로 총 17가지가 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [A, B] = input.shift().split(' ').map(Number);
const m = +input.shift();
const eaDigit = input.shift().split(' ').map(Number);
// console.log([A, B], m, eaDigit);

// 문제 로직

// A진법 수를 10진법으로 변환
let deciN = 0;
const revDigit = eaDigit.reverse();
for (let i = 0; i < m; i++) {
  deciN += revDigit[i] * A ** i;
}
// console.log('deciN', deciN);

// 10진법 수를 B진법으로 변환
let num = deciN;
let mod = num;
const remainder = [];
while (mod > 0) {
  mod = Math.floor(num / B);
  remainder.push(num % B);
  num = mod;
}
console.log(remainder.reverse().join(' '));
