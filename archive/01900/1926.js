// https://www.acmicpc.net/problem/1926
/*
그림

어떤 큰 도화지에 그림이 그려져 있을 때, 그 그림의 개수와, 그 그림 중 넓이가 가장 넓은 것의 넓이를 출력하여라. 단, 그림이라는 것은 1로 연결된 것을 한 그림이라고 정의하자. 가로나 세로로 연결된 것은 연결이 된 것이고 대각선으로 연결이 된 것은 떨어진 그림이다. 그림의 넓이란 그림에 포함된 1의 개수이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[R, C], ...graph] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(R, C, graph);

// 문제 로직
/**
 * queue 이용한 BFS
 */

// 주어진 좌표를 기점으로 그림 넓이 구하는 BFS 함수
const visited = Array.from({ length: R }, () => new Array(C).fill(false));
function bfs(r, c) {
  const queue = [];
  let cnt = 1;
  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];
  queue.push([r, c]);
  while (queue.length) {
    const [cr, cc] = queue.shift();
    for (let k = 0; k < 4; k++) {
      const nr = cr + dr[k];
      const nc = cc + dc[k];
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (graph[nr][nc] === 1 && !visited[nr][nc]) {
        visited[nr][nc] = true;
        cnt++;
        queue.push([nr, nc]);
      }
    }
  }
  return cnt;
}

// 전체 순회하며 그림 수와 최대 넓이 갱신하기
let face = 0;
let maxWidth = 0;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (graph[r][c] === 1 && !visited[r][c]) {
      visited[r][c] = true;
      face++;
      maxWidth = Math.max(maxWidth, bfs(r, c));
    }
  }
}
// 결과 출력
console.log(`${face}\n${maxWidth}`);
