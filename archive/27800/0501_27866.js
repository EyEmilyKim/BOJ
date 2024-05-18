// https://www.acmicpc.net/problem/27866
/*
문자와 문자열

단어 S와 정수 i가 주어졌을 때, S의 i번째 글자를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const S = input[0];
const i = +input[1];
// console.log(S, i);

//문제 로직
console.log(S[i - 1]);
// console.log(S.charAt(i - 1));
// console.log(S.substring(i - 1, i));

/**
 위 세 구문 모두 같은 결과값으로 정답 처리됨.
 */
