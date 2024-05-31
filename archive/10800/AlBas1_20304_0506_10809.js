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

//문제 로직 - 방법 1 : 알파벳 순서대로 idx 찾아 출력하기
let list = [];
for (i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
  if (!input.includes(String.fromCharCode(i))) list.push(-1);
  else list.push(input.indexOf(String.fromCharCode(i)));
}
console.log(list.join(' '));

// 문제 로직 - 방법 2 : 문자열 알파벳의 idx 맵 만들어놓고 알파벳 순회하며 출력하기
// 첫 인덱스 맵
const map = new Map();
Array.from(input).forEach((i, idx) => {
  if (!map.has(i)) map.set(i, idx);
});
// console.log(map);
//Map(7) { 'b' => 0, 'a' => 1, 'e' => 2, 'k' => 3, 'j' => 4, 'o' => 5, 'n' => 7 }

// 알파벳 순회하며 첫 인덱스 확인 & 출력
const result = [];
Array.from('abcdefghijklmnopqrstuvwxyz').forEach((i) => {
  result.push(map.has(i) ? map.get(i) : -1);
});
console.log(result.join(' '));
