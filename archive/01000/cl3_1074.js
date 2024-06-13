// https://www.acmicpc.net/problem/1074
/*
Z

한수는 크기가 2N × 2N인 2차원 배열을 Z모양으로 탐색하려고 한다. 예를 들어, 2×2배열을 왼쪽 위칸, 오른쪽 위칸, 왼쪽 아래칸, 오른쪽 아래칸 순서대로 방문하면 Z모양이다.

N > 1인 경우, 배열을 크기가 2N-1 × 2N-1로 4등분 한 후에 재귀적으로 순서대로 방문한다.
다음 예는 22 × 22 크기의 배열을 방문한 순서이다.
...
다음은 N=3일 때의 예이다.
...

N이 주어졌을 때, r행 c열을 몇 번째로 방문하는지 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(' ');
const [N, targetR, targetC] = input.map(Number);
// console.log(N, [targetR, targetC]);

// 문제 로직
/**
 * 재귀적으로 영역 4분할하며 타겟 찾아 좁혀가기
 1. 영역 내에 타겟 있다면 그 안에서 구역 4분할,
    1 좌상, 2 우상, 3 좌하, 4우하 (Z자) 순으로 타겟 탐색
 2. 영역 내 타겟 없다면 스텝 수만 더하고 다음 구역으로 넘어가기
 3. 타겟 위치 도달하면 거쳐온 스텝 출력
 
 * 분할 정복
 */

// 영역 4분할하며 타겟 위치 찾아 좁혀가는 함수
let step = 0;
function divide(row, col, size) {
  if (row === targetR && col === targetC) {
    // 타겟 찾음
    return console.log(step); // 거쳐온 스텝 출력
  }
  if (targetR >= row && targetR < row + size && targetC >= col && targetC < col + size) {
    // 영역 내에 타겟 있다면 그 안에서 구역 4분할,
    // 1 좌상, 2 우상, 3 좌하, 4우하 (Z자) 순으로 타겟 탐색
    size /= 2;
    divide(row, col, size); // 1구역
    divide(row, col + size, size); // 2구역
    divide(row + size, col, size); // 3구역
    divide(row + size, col + size, size); // 4구역
  } else {
    // 영역 내 타겟 없다면 스텝 수만 더하고 다음 구역으로 넘어가기
    step += size * size;
  }
}

divide(0, 0, 2 ** N);
