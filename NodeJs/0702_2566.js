// https://www.acmicpc.net/problem/2566
/*
최댓값

<그림 1>과 같이 9×9 격자판에 쓰여진 81개의 자연수 또는 0이 주어질 때, 이들 중 최댓값을 찾고 그 최댓값이 몇 행 몇 열에 위치한 수인지 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

//문제 로직
let max = 0;
let R = -1;
let C = -1;
for (let r = 0; r < 9; r++) {
  const row = input[r].split(' ').map((val) => +val);
  for (let c = 0; c < 9; c++) {
    if (row[c] >= max) {
      max = row[c];
      R = r + 1;
      C = c + 1;
    }
  }
}
console.log(max);
console.log(R + ' ' + C);

/**
 * 주어지는 수는 100보다 작은 자연수 또는 0이다.
 * => 9*9 모든 칸이 0 들어올 경우도 고려해야 하므로
 * max 값 좌표 저장 조건은 초기값인 0 보다 '>=' 크거나 같아야 함.
 */
