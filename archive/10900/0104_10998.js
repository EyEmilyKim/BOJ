// https://www.acmicpc.net/problem/10998
/*
A×B

두 정수 A와 B를 입력받은 다음, A×B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split(' ');
const A = parseInt(input[0]);
const B = parseInt(input[1]);

// 문제 로직
console.log(A * B);
