// https://www.acmicpc.net/problem/21920
/*
서로소 평균

효성이는 길이가 N인 수열 A에서 X와 서로소인 수들을 골라 평균을 구해보려고 한다.
효성이를 도와 이를 계산해주자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const A = input[1].split(' ').map(Number);
const X = +input[2];
// console.log(N, A, X);

// 문제 로직
/**
 * 서로소 : 두 수의 공약수가 1밖에 없는 경우
 */

// 최대공약수 구하는 함수
function getGCD(a, b) {
  return b ? getGCD(b, a % b) : a;
}

// 작업 수행
const coprime = []; // X와 서로소인 수
for (const a of A) {
  if (getGCD(a, X) === 1) coprime.push(a);
}
// console.log(coprime);
const avg = coprime.reduce((a, b) => a + b) / coprime.length;
console.log(avg);
