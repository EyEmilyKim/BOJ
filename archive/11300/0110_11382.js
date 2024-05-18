// https://www.acmicpc.net/problem/11382
/*
꼬마 정민

꼬마 정민이는 이제 A + B 정도는 쉽게 계산할 수 있다. 이제 A + B + C를 계산할 차례이다!

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(' ');
const [A, B, C] = input.map((val) => +val);

// 문제 로직
console.log(A + B + C);
