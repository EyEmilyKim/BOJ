// https://www.acmicpc.net/problem/11651
/*
좌표 정렬하기 2

2차원 평면 위의 점 N개가 주어진다. 좌표를 y좌표가 증가하는 순으로, y좌표가 같으면 x좌표가 증가하는 순서로 정렬한 다음 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
const coords = input.map((i) => i.split(' ').map(Number));
coords.sort((a, b) => {
  if (a[1] !== b[1]) return a[1] - b[1];
  return a[0] - b[0];
});
// console.log(coords);
let result = '';
coords.forEach((i) => (result += i.join(' ') + '\n'));
console.log(result.trim());
