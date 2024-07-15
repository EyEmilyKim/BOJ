// https://www.acmicpc.net/problem/1269
/*
대칭 차집합

자연수를 원소로 갖는 공집합이 아닌 두 집합 A와 B가 있다. 이때, 두 집합의 대칭 차집합의 원소의 개수를 출력하는 프로그램을 작성하시오. 두 집합 A와 B가 있을 때, (A-B)와 (B-A)의 합집합을 A와 B의 대칭 차집합이라고 한다.

예를 들어, A = { 1, 2, 4 } 이고, B = { 2, 3, 4, 5, 6 } 라고 할 때,  A-B = { 1 } 이고, B-A = { 3, 5, 6 } 이므로, 대칭 차집합의 원소의 개수는 1 + 3 = 4개이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [a, b] = input.shift().split(' ').map(Number);
const [A, B] = input.map((i) => i.split(' ').map(Number));
// console.log(a, b, A, B);

// 문제 로직
const setA = new Set(A);
const setB = new Set(B);
// console.log(setA, setB);
const A_B = A.filter((i) => !setB.has(i));
const B_A = B.filter((i) => !setA.has(i));
// console.log('A_B', A_B);
// console.log('B_A', B_A);
const sumCnt = A_B.length + B_A.length;
console.log(sumCnt);
