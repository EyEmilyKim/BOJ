// https://www.acmicpc.net/problem/3085
/*
사탕 게임

상근이는 어렸을 적에 "봄보니 (Bomboni)" 게임을 즐겨했다.

가장 처음에 N×N크기에 사탕을 채워 놓는다. 사탕의 색은 모두 같지 않을 수도 있다. 상근이는 사탕의 색이 다른 인접한 두 칸을 고른다. 그 다음 고른 칸에 들어있는 사탕을 서로 교환한다. 이제, 모두 같은 색으로 이루어져 있는 가장 긴 연속 부분(행 또는 열)을 고른 다음 그 사탕을 모두 먹는다.

사탕이 채워진 상태가 주어졌을 때, 상근이가 먹을 수 있는 사탕의 최대 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const candy = input.map((i) => i.split(''));
// console.log(N, candy);
// console.log(candy.map((i) => i.join('')).join('\n'), '\n');

// 문제 로직
/**
 * 브루트 포스
 * 모든 칸에서 상하, 좌우 바꾼 후 최대값 세고 원위치, 다음 칸으로 이동해서 또 바꾸고 세고 원위치.. 반복하며 최대값 갱신
 */

// 방향 지정해서 색이 다른 인접 사탕과 위치 바꾸는 함수
function swapCandy(r, c, d) {
  const dir = [
    [1, 0], // 아래 캔디와 바꿈
    [0, 1], // 오른쪽 캔디와 바꿈
  ];
  const [nr, nc] = [r + dir[d][0], c + dir[d][1]];
  // console.log('r', r, 'c', c, '-> nr', nr, 'nc', nc);

  let swappable = 1;
  // 바꾸려는 위치가 범위 밖이거나, 같은 색이면 아무 일 없이 false 반환
  if (nr >= N || nc > N) return (swappable = -1); // 범위 밖
  if (candy[r][c] === candy[nr][nc]) return (swappable = 0); // 같은 색
  // 위 경우가 아니면 위치 바꾸고 true 반환
  [candy[r][c], candy[nr][nc]] = [candy[nr][nc], candy[r][c]];
  return swappable; // 위치 바뀜
}

// 가로, 세로 완전 탐색하며 연결된 최대 개수 구하는 함수
function countMaxCandy() {
  let max = 0;
  for (let d = 0; d < 2; d++) {
    // p = 0 : 세로 연결 탐색, p = 1 : 가로 연결 탐색
    for (let x = 0; x < N; x++) {
      let cnt = 0;
      let color = targetCandy(x, 0, d);
      for (let y = 0; y < N; y++) {
        if (targetCandy(x, y, d) === color) {
          cnt++;
          if (cnt > max) max = cnt;
        } else {
          cnt = 1;
          color = targetCandy(x, y, d);
        }
      }
    }
  }
  return max;
}
function targetCandy(x, y, d) {
  if (d) return candy[x][y]; // 열 idx 옮겨가며 모든 행 (가로 연결) 탐색
  else return candy[y][x]; // 행 idx 옮겨가며 모든 열 (세로 연결) 탐색
}

// 작업 수행
let maxCandy = 0;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    for (let d = 0; d < 2; d++) {
      if (swapCandy(r, c, d)) {
        maxCandy = Math.max(countMaxCandy(), maxCandy);
        swapCandy(r, c, d);
      }
    }
  }
}
console.log(maxCandy);
