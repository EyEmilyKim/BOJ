// https://www.acmicpc.net/problem/2206
/*
벽 부수고 이동하기

N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다. 최단경로는 맵에서 가장 적은 개수의 칸을 지나는 경로를 말하는데, 이때 시작하는 칸과 끝나는 칸도 포함해서 센다.

만약에 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 한 개 까지 부수고 이동하여도 된다.

한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.

맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...data] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [R, C] = N.split(' ').map(Number);
// console.log(R, C, data);

// 문제 로직
/**
 * bfs
 * 벽 부순 세계선과 안 부순 세계선 방문체크를 따로 해야 함
 => check 배열 각 좌표에 차원을 하나 더 추가 (0: 벽 아직 안부숨 / 1: 이미 한번 부숨)
 */

// 좌표 데이터 입력
const field = [];
for (let i = 0; i < R; i++) {
  const line = data[i].split('').map(Number);
  field.push(line);
}
// console.log(field);

// 작업 수행 & 출력
console.log(bfs());

// 좌표 순회하며 최단거리 구하는 BFS 함수
function bfs() {
  // 시작지점과 목표지점이 같으면 1스텝
  if (R - 1 === 0 && C - 1 === 0) return 1;

  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  // check[r][c][0/1] :
  // 각 좌표 방문여부 겸 각 세계선(0:벽 부수지 않음, 1: 벽 부숨) 최단 도달 스텝수
  const check = Array.from({ length: R }, () =>
    Array.from({ length: C }, () => Array.from({ length: 2 }, () => 0))
  );
  // console.log(check);

  let queue = [];
  let idx = 0;
  queue.push([0, 0, 0]); // [r,c,isBreak]
  check[0][0][0] = 1;

  while (idx !== queue.length) {
    const [r, c, isBreak] = queue[idx++];
    // console.log('r', r, 'c', c, 'isBreak', isBreak);

    // 목표지점 도달하면 스텝수 반환하고 끝
    if (r === R - 1 && c === C - 1) {
      return check[r][c][isBreak];
    }

    // 4방향으로 이동하며 bfs 계속
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      // 좌표 밖이면 pass
      if (nr < 0 || nc < 0 || nr >= R || nc >= C) continue;
      if (field[nr][nc] === 0 && check[nr][nc][isBreak] === 0) {
        // 벽이 아니고 미방문일 때 -> 큐에 넣고 스텝수 체크
        check[nr][nc][isBreak] = check[r][c][isBreak] + 1;
        queue.push([nr, nc, isBreak]);
      } else if (field[nr][nc] === 1 && !isBreak) {
        // 벽이고 아직 부술 챤스가 남았을 때 -> 벽 부수는 세계선으로 큐에 넣고 스텝수 체크
        check[nr][nc][isBreak + 1] = check[r][c][isBreak] + 1;
        queue.push([nr, nc, isBreak + 1]);
      }
    }
  }

  return -1; // 끝까지 목표지점 도달 못하면 -1 반환
}
