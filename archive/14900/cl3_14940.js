// https://www.acmicpc.net/problem/14940
/*
쉬운 최단거리

지도가 주어지면 모든 지점에 대해서 목표지점까지의 거리를 구하여라.
문제를 쉽게 만들기 위해 오직 가로와 세로로만 움직일 수 있다고 하자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
// console.log(N, M, input);
// console.log(input.join('\n'));

// 문제 로직
/**
 * bfs : 목표지점(거리:0)부터 인접 미방문 칸 거리 +1 하며 채워나가기.
 * 함정 : 닿을 수 없는 벽 너머 모든 칸에 대해 벽 or 도달불가 처리 잊지 말기!

*/

// 지도와 목표지점 입력
const land = Array.from(new Array(N + 2), () => new Array(M + 2).fill(-2));
// N,M +2 : 상하좌우 이동 시 배열 범위 오류 피하기 위해 외곽 테두리 둘러줌
let target; // 목표지점 인덱스 저장
input.forEach((r, idxR) => {
  const row = r.split(' ').map(Number);
  row.forEach((v, idxC) => {
    land[idxR + 1][idxC + 1] = v;
    if (v === 2) target = [idxR + 1, idxC + 1];
  });
});
// console.log(land, target);

// 거리 지도 채우기
const dist = Array.from(new Array(N + 2), () => new Array(M + 2).fill(-2));
dist[target[0]][target[1]] = 0; // 목표지점은 거리 0
const queue = [target]; // 인접 업데이트할 칸 저장
let head = 0; // shift() 대신 index 옮겨가며 접근
const nextR = [1, -1, 0, 0]; // 상하 이동
const nextC = [0, 0, -1, 1]; // 좌우 이동
// 인접 상하좌우 미방문 칸 처리
while (head < queue.length) {
  const [curR, curC] = queue[head++];
  const distance = dist[curR][curC];
  for (let i = 0; i < 4; i++) {
    newR = curR + nextR[i];
    newC = curC + nextC[i];
    if (dist[newR][newC] === -2) {
      if (land[newR][newC] === 0) dist[newR][newC] = 0;
      else if (land[newR][newC] === 1) {
        dist[newR][newC] = distance + 1;
        queue.push([newR, newC]);
      }
    }
  }
}
// 벽 너머 미방문 칸 처리
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    if (dist[i][j] === -2) {
      if (land[i][j] === 0) dist[i][j] = 0;
      else if (land[i][j] === 1) dist[i][j] = -1;
    }
  }
}
// console.log('dist', dist.map((i) => i.join(' ')).join('\n'));

// 거리 지도 출력
const result = [];
for (let i = 1; i <= N; i++) {
  let tmp = '';
  for (let j = 1; j <= M; j++) {
    tmp += dist[i][j] + ' ';
  }
  result.push(tmp.trim());
}
console.log(result.join('\n'));
