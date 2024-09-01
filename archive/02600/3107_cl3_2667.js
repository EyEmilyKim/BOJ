// https://www.acmicpc.net/problem/2667
/*
단지번호붙이기

<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const map = input.map((i) => i.split('').map(Number));
// console.log(N, map);

// 문제 로직
/**
 * 깊이 우선 탐색 DFS
 */

const visited = Array.from({ length: N }, () => Array(N).fill(0));
const direction = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let cnt_home = 0;
let cnt_complex = 0;

function dfs(x, y) {
  if (map[x][y] && !visited[x][y]) {
    visited[x][y] = 1;
    cnt_home++;

    for (const dir of direction) {
      const nx = x + dir[0];
      const ny = y + dir[1];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      dfs(nx, ny);
    }
  }
}

const result = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] && !visited[i][j]) {
      dfs(i, j);
      cnt_complex++;
      result.push(cnt_home);
      cnt_home = 0;
    }
  }
}

console.log(cnt_complex + '\n' + `${result.sort((a, b) => a - b).join('\n')}`);
