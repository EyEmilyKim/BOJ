// https://www.acmicpc.net/problem/10926
/*
??!

준하는 사이트에 회원가입을 하다가 joonas라는 아이디가 이미 존재하는 것을 보고 놀랐다. 준하는 놀람을 ??!로 표현한다. 준하가 가입하려고 하는 사이트에 이미 존재하는 아이디가 주어졌을 때, 놀람을 표현하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().trim();
// console.log(input);

// 문제 로직
const wow = '??!';
console.log(input + wow);

/**
 입력값이 문자열일 때는 trim() (-> 앞뒤 공백(개행 & space) 제거) 필수 !
 */
