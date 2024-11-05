// https://www.acmicpc.net/problem/14502
/*
연구소

인체에 치명적인 바이러스를 연구하던 연구소에서 바이러스가 유출되었다. 다행히 바이러스는 아직 퍼지지 않았고, 바이러스의 확산을 막기 위해서 연구소에 벽을 세우려고 한다.

연구소는 크기가 N×M인 직사각형으로 나타낼 수 있으며, 직사각형은 1×1 크기의 정사각형으로 나누어져 있다. 연구소는 빈 칸, 벽으로 이루어져 있으며, 벽은 칸 하나를 가득 차지한다. 

일부 칸은 바이러스가 존재하며, 이 바이러스는 상하좌우로 인접한 빈 칸으로 모두 퍼져나갈 수 있다. 새로 세울 수 있는 벽의 개수는 3개이며, 꼭 3개를 세워야 한다.

예를 들어, 아래와 같이 연구소가 생긴 경우를 살펴보자.

2 0 0 0 1 1 0
0 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 0 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
이때, 0은 빈 칸, 1은 벽, 2는 바이러스가 있는 곳이다. 아무런 벽을 세우지 않는다면, 바이러스는 모든 빈 칸으로 퍼져나갈 수 있다.

2행 1열, 1행 2열, 4행 6열에 벽을 세운다면 지도의 모양은 아래와 같아지게 된다.

2 1 0 0 1 1 0
1 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 1 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
바이러스가 퍼진 뒤의 모습은 아래와 같아진다.

2 1 0 0 1 1 2
1 0 1 0 1 2 2
0 1 1 0 1 2 2
0 1 0 0 0 1 2
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
벽을 3개 세운 뒤, 바이러스가 퍼질 수 없는 곳을 안전 영역이라고 한다. 위의 지도에서 안전 영역의 크기는 27이다.

연구소의 지도가 주어졌을 때 얻을 수 있는 안전 영역 크기의 최댓값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[row, col], ...lab] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(col, row, lab);

// 문제 로직
/**
1. 벽 차례로 세움(DFS + 백트래킹) 
2. 벽 3개가 되면 바이러스 살포 후(BFS)
3. 안전 영역 카운트(브루트포스)
 */

// 바이러스 살포(BFS) 후 안전 영역 세는(브루트포스) 함수
function countSafeZone(arr) {
  let safeCnt = 0;
  let queue = [];

  // 배열 순회하며 바이러스가 있는 곳(2) 큐에 담기
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (arr[i][j] === 2) queue.push([i, j]);
    }
  }

  // 큐에서 하나씩 꺼내며 벽이 아닌 인접구역(0) 감염시키기
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  while (queue.length) {
    const [r, c] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const [nr, nc] = [r + dr[i], c + dc[i]];

      if (nr < 0 || nr >= row || nc < 0 || nc >= col) continue;
      if (arr[nr][nc] === 0) {
        arr[nr][nc] = 2;
        queue.push([nr, nc]);
      }
    }
  }

  // 최종 안전 구역 카운트 세기
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (arr[i][j] === 0) safeCnt++;
    }
  }

  return safeCnt;
}

// 차례로 벽 세우고(백트래킹 DFS) 벽 3개가 되면 안전 영역 세기
let maxSafeCnt = 0;
function dfs(wall) {
  if (wall === 3) {
    let labCopy = lab.map((v) => [...v]);
    let safeCnt = countSafeZone(labCopy);

    maxSafeCnt = Math.max(maxSafeCnt, safeCnt);
    return;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (lab[i][j] === 0) {
        lab[i][j] = 1;
        dfs(wall + 1);
        lab[i][j] = 0;
      }
    }
  }
}

// 작업 수행
dfs(0);
console.log(maxSafeCnt);
