// https://www.acmicpc.net/problem/1008
/*
두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(' ');
const A = +input[0];
const B = +input[1];

// 문제 로직
console.log(A / B);

/**
 parseInt() 대신에 + 연산자 사용해도 암시적으로 정수로 바꿔준다
 */
