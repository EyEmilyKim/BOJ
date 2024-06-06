// https://www.acmicpc.net/problem/31403
/*
A + B - C

JavaScript에서 +, -은 수에 대해서는 일반적인 의미의 덧셈 뺄셈의 의미를 가지고 있습니다. 하지만 문자열에 대해서 +는 두 문자열을 이어붙이라는 의미이고, -는 양쪽 문자열을 수로 해석한 이후에 빼라는 의미입니다.

A, B, C를 각각 수와 문자열로 생각했을 때 
A+B-C를 출력하세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [A, B, C] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(A, B, C);

// 문제 로직
const num = Number(A) + Number(B) - Number(C);
const str = A + B - C;
console.log(`${num}\n${str}`);
