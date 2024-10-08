// https://www.acmicpc.net/problem/2178
/*
미로 탐색

N×M크기의 배열로 표현되는 미로가 있다.

1	0	1	1	1	1
1	0	1	0	1	0
1	0	1	0	1	1
1	1	1	0	1	1
미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
const maze = input.map((i) => i.split('').map(Number));
// console.log(N, M, maze);

// 문제 로직
/**
 * 너비 우선 탐색 BFS
 */

const check = Array.from({ length: N }, () => new Array(M).fill(0));
function bfs(row, col) {
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const queue = [];
  queue.push([row, col]);
  check[row][col] = 1;
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue; // 미로 벗어난 좌표 제외
      if (maze[nx][ny] && !check[nx][ny]) {
        check[nx][ny] = check[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  // console.log(check);
  return check[N - 1][M - 1];
}

console.log(bfs(0, 0));
