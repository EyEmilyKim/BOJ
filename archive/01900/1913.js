// https://www.acmicpc.net/problem/1913
/*
달팽이

홀수인 자연수 N이 주어지면, 다음과 같이 1부터 N2까지의 자연수를 달팽이 모양으로 N×N의 표에 채울 수 있다.

9	2	3
8	1	4
7	6	5

25	10	11	12	13
24	9	  2	  3	  14
23	8	  1	  4	  15
22	7	  6	  5	  16
21	20	19	18	17

N이 주어졌을 때, 이러한 표를 출력하는 프로그램을 작성하시오. 또한 N2 이하의 자연수가 하나 주어졌을 때, 그 좌표도 함께 출력하시오. 예를 들어 N=5인 경우 6의 좌표는 (4,3)이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, target] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(N, target);

// 문제 로직
/**
 * (0,0)부터 반시계방향으로 숫자 N*N 에서 1까지 감소하며 입력
 * 현재 위치 숫자 == target 이면 좌표 위치 저장
 */

const arr = Array.from({ length: N }, () => new Array(N).fill(0));
const offset = [
  [1, 0], // down
  [0, 1], // right
  [-1, 0], // up
  [0, -1], // left
]; // 진행 방향 오프셋
let dir = 0; // 현재 진행 방향
let num = N * N;
let [r, c] = [0, 0]; // 시작 지점
let [x, y] = [0, 0]; // target 지점

while (num > 0) {
  arr[r][c] = num;
  if (num === target) [x, y] = [r + 1, c + 1];

  num--;
  const nr = r + offset[dir][0];
  const nc = c + offset[dir][1];
  // 다음 좌표가 범위 벗어나거나 이미 숫자 들어있다면 방향 전환
  if (0 > nr || nr >= N || 0 > nc || nc >= N || arr[nr][nc] !== 0) {
    dir = (dir + 1) % 4;
  }
  // 옳은 방향 적용한 다음 좌표로 반복 진행
  r = r + offset[dir][0];
  c = c + offset[dir][1];
}

console.log(arr.map((i) => i.join(' ')).join('\n'));
console.log(`${x} ${y}`);
