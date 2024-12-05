// https://www.acmicpc.net/problem/7569
/*
토마토

철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자모양 상자의 칸에 하나씩 넣은 다음, 상자들을 수직으로 쌓아 올려서 창고에 보관한다.
...


창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토에 인접한 곳은 위, 아래, 왼쪽, 오른쪽, 앞, 뒤 여섯 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지 그 최소 일수를 알고 싶어 한다.

토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [C, R, L] = input.shift(); // C:가로(열), R:세로(행), L:높이(층)
// console.log(C, R, L, input);

// 문제 로직
/**
 * 3차원 배열, BFS 너비 우선 탐색
 */

// 토마토 3차원 위치 & 상태 데이터 입력
const box = Array.from({ length: L }, () => Array.from({ length: R }, () => new Array(C).fill(0)));
const queue = []; // 익은 토마토 큐
let unripeTomato = 0; // 안익은 토마토 개수
for (let l = 0; l < L; l++) {
  for (let r = 0; r < R; r++) {
    const line = input.shift();
    box[l][r] = line;
    line.forEach((v, idx) => {
      if (v === 1) queue.push([l, r, idx, 0]);
      if (v === 0) unripeTomato++;
    });
  }
}
if (!unripeTomato) return console.log(0); // 처음부터 다 익어있으면 0 출력, 끝.
// console.log('box', box, '\nqueue', queue);
// console.log('unripeTomato', unripeTomato);

// 하루마다 상하,좌우,위층/아래층으로 퍼져가며 토마토 숙성
const dir = [
  // 상하좌우위아래 6방향
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
function isOutOfRange(l, r, c) {
  // 유효 좌표 판별
  if (l < 0 || l >= L) return true;
  if (r < 0 || r >= R) return true;
  if (c < 0 || c >= C) return true;
  return false;
}
let idx = 0; // 큐 인덱스
let result = 0; // 다 익는데 걸리는 시간

while (idx < queue.length) {
  const [l, r, c, days] = queue[idx++];

  for (let [dl, dr, dc] of dir) {
    const nl = l + dl;
    const nr = r + dr;
    const nc = c + dc;

    if (isOutOfRange(nl, nr, nc) || box[nl][nr][nc]) continue; // 좌표 밖이거나 이미 방문했으면 pass
    box[nl][nr][nc] = 1; // 토마토 익힘 (방문) 처리
    queue.push([nl, nr, nc, days + 1]); // 큐에 해당 위치와 걸린 시간(하루 증가) 추가
    unripeTomato--; // 안익은 토마토 개수 감소
  }

  result = days; // 소요 시간 갱신
}

// 결과 출력
console.log(unripeTomato ? -1 : result);
