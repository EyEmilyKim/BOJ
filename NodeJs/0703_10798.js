// https://www.acmicpc.net/problem/10798
/*
세로읽기


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

//문제 로직
//테이블 준비하기
const R = input.length; // 테이블 행수
let rowCnt = [];
input.forEach((i) => {
  rowCnt.push(i.length);
});
const C = Math.max(...rowCnt); // 테이블 열수
// console.log(R, C);
const table = [];
for (let i = 0; i < R; i++) table.push(new Array(C).fill(''));
// console.log(table);

//테이블 채우기
for (let r = 0; r < R; r++) {
  const item = input[r].split('');
  for (let c = 0; c < item.length; c++) {
    table[r][c] = item[c];
  }
}
// console.log(table);

//테이블 읽기
let str = '';
for (let c = 0; c < C; c++) {
  for (let r = 0; r < R; r++) {
    str += table[r][c];
  }
}
console.log(str);
