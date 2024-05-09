// https://www.acmicpc.net/problem/1157
/*
단어 공부

알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 단, 대문자와 소문자를 구분하지 않는다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

//문제 로직
const upper = input.toUpperCase().split('');
// console.log('A'.charCodeAt(0)); //65
const cnt = new Array(26).fill(0);
for (let i = 0; i < upper.length; i++) {
  const target = upper[i];
  cnt[target.charCodeAt(0) - 65]++;
}
// console.log(cnt);

const max = Math.max(...cnt);
const maxIdx = cnt.indexOf(max);
// console.log(max, idx);

let isMulti = 0;
for (let i = 0; i < 26; i++) {
  if (cnt[i] === max && maxIdx != i) {
    isMulti = 1;
    break;
  }
}

console.log(isMulti ? '?' : String.fromCharCode(maxIdx + 65));
