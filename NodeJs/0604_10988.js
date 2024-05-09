// https://www.acmicpc.net/problem/10988
/*
팰린드롬인지 확인하기

알파벳 소문자로만 이루어진 단어가 주어진다. 이때, 이 단어가 팰린드롬인지 아닌지 확인하는 프로그램을 작성하시오.

팰린드롬이란 앞으로 읽을 때와 거꾸로 읽을 때 똑같은 단어를 말한다. 
level, noon은 팰린드롬이고, baekjoon, online, judge는 팰린드롬이 아니다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

//문제 로직 - 방법 1
// const r = Math.floor(input.length / 2);
// let palindrome = 1;
// for (i = 0; i < r; i++) {
//   if (input[i] != input[input.length - 1 - i]) {
//     palindrome = 0;
//     break;
//   }
// }
// console.log(palindrome);

//문제 로직 - 방법 2
const rvs = input.split('').reverse().join('');
// console.log(rvs);
let palindrome = -1;
palindrome = input == rvs ? 1 : 0;
console.log(palindrome);
