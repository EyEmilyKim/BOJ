// https://www.acmicpc.net/problem/9613
/*
GCD 합

양의 정수 n개가 주어졌을 때, 가능한 모든 쌍의 GCD의 합을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(T, input);

// 문제 로직
// GCD(최대공약수) 구하는 함수 - 유클리드 호제법 이용
function getGCD(a, b) {
  // (조건 : a>b)
  if (a % b === 0) return b;
  return getGCD(b, a % b);
}

// 배열 내 모든 조합의 GCD 합 구하는 함수
function getSumGCD(n, ...arr) {
  let sum = 0;
  arr.sort((a, b) => b - a); // 배열 내림차순 -> getGCD() 인자로 큰 수 먼저 주기 위해
  arr.forEach((val, idx) => {
    while (idx < n - 1) sum += getGCD(val, arr[++idx]);
  });
  return sum;
}

// 테스트 케이스 순회하며 작업 수행
const result = [];
input.forEach((i) => {
  result.push(getSumGCD(...i.split(' ').map((v) => +v)));
});
console.log(result.join('\n'));
