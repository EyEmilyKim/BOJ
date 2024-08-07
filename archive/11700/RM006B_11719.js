// https://www.acmicpc.net/problem/11719
/*
그대로 출력하기 2

입력 받은 대로 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().split(/\r?\n/);

// 문제 로직
console.log(input.join('\n'));
