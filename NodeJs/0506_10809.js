// https://www.acmicpc.net/problem/10809
/*
알파벳 찾기

알파벳 소문자로만 이루어진 단어 S가 주어진다. 각각의 알파벳에 대해서, 단어에 포함되어 있는 경우에는 처음 등장하는 위치를, 포함되어 있지 않은 경우에는 -1을 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim();
// console.log(input);

//문제 로직
let list = [];
for (i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
  if (!input.includes(String.fromCharCode(i))) list.push(-1);
  else list.push(input.indexOf(String.fromCharCode(i)));
}
console.log(list.join(' '));
