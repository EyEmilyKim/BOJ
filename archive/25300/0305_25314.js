// https://www.acmicpc.net/problem/25314
/*
코딩은 체육과목 입니다

int 앞에 long 붙일 때마다 4바이트 씩 저장할 수 있는 공간이 늘어날거야 !
혜아가 N바이트 정수까지 저장할 수 있다고 생각해서 칠판에 쓴 정수 자료형의 이름은 무엇일까?

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString();
const num = input / 4;
// console.log(num);

// 문제 로직
let hyea = '';
for (i = 0; i < num; i++) hyea += 'long ';
console.log(hyea + 'int');
