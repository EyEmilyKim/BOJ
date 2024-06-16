// https://www.acmicpc.net/problem/7576
/*
토마토

철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.

창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 알고 싶어 한다.

토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [M, N] = input.shift().split(' ').map(Number);
// console.log(M, N, input);

// 문제 로직
/**
 * 거리 측정 bfs
 * 처음 시작점부터 숙성 토마토 좌표(graph 상 +1)를 queue에 계속 담음
 * queue 하나씩 꺼내면서 이웃칸 graph에 +1 값 저장, 숙성 토마토 좌표 queue 저장.
 * queue에는 새롭게 숙성된 좌표가 순서대로 들어온다.
 * queue 꺼낼 때, shift()는 느리니까 head(인덱스)로 접근.
 */

// 토마토 박스 준비 (M,N +2 : 상하좌우 비교 쉽게 테두리 둘러주기)
const box = Array.from(new Array(N + 2), () => new Array(M + 2).fill(-2));

// 위치값 입력, 익은 토마토 큐 준비
const queue = [];
let row = 1; // 행 index
input.forEach((i) => {
  const rowData = i.split(' ').map(Number);
  for (let j = 0; j < M; j++) {
    box[row][j + 1] = rowData[j];
    if (rowData[j] === 1) {
      queue.push([row, j + 1]); // 큐에 익은 토마토 좌표 저장
    }
  }
  row++;
});
// console.log('box', box);
// console.log('queue', queue);

// 숙성 전파
let head = 0; // queue 에 접근할 index (느린 shift() 대안으로 사용)
let nextR = [1, -1, 0, 0]; // 인접 상하
let nextC = [0, 0, 1, -1]; // 인접 좌우
while (head < queue.length) {
  const [curR, curC] = queue[head];
  const day = box[curR][curC];
  // console.log(head, [curR, curC], day);
  for (let i = 0; i < 4; i++) {
    const newR = curR + nextR[i];
    const newC = curC + nextC[i];
    if (box[newR][newC] !== 0) continue; // 이미 익었거나 토마토 없는 칸 pass
    box[newR][newC] = day + 1;
    queue.push([newR, newC]);
  }
  head++;
}
// console.log('box', box);

// 최소 소요일 찾아 출력
let day = 1; // 초기 상태 1
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    if (box[i][j] === 0) {
      return console.log(-1); // 미숙성 남아있으면 -1 출력, 게임 끝.
    }
    day = Math.max(day, box[i][j]);
  }
}
console.log(day - 1); // -1 : 초기 상태 카운트 제외

// // 문제 로직 - 시간 초과 ㅠㅠ

// // 토마토 박스 준비 (M,N +2 : 상하좌우 비교 쉽게 테두리 둘러주기)
// const box = Array.from(new Array(N + 2), () => new Array(M + 2).fill(-2));

// // 토마토 배치값 입력
// let row = 1; // 행 index
// let cnt0 = 0; // 안 익은 수 카운트
// input.forEach((i) => {
//   const rowData = i.split(' ').map(Number);
//   for (let j = 0; j < M; j++) {
//     box[row][j + 1] = rowData[j];
//     if (rowData[j] === 0) cnt0++;
//   }
//   row++;
// });
// // console.log(box);

// // 하루하루 숙성 경과 확인
// let day = 0; // 다음날 되거나 -1로 끝나거나
// let notYet = cnt0; // 현재 안익은 토마토 수
// // console.log('notYet', notYet);
// const nextR = [1, -1, 0, 0]; // 인접 상하
// const nextC = [0, 0, -1, 1]; // 인접 좌우
// while (day >= 0 && notYet > 0) {
//   day++; // 날이 밝고
//   notYet = 0; // 안익은 토마토 수 초기화
//   const prev = JSON.parse(JSON.stringify(box)); // 어제까지 상태
//   // console.log(`---- day `, day, ` notYet `, notYet, ` ----`);
//   for (let i = 1; i <= N; i++) {
//     for (let j = 1; j <= M; j++) {
//       if (box[i][j] === 1 || box[i][j] === -1) continue;
//       // 상하좌우 토마토 확인..
//       let noNext = 0; // 인접 토마토 없는 칸
//       for (let k = 0; k < 4; k++) {
//         if (prev[i + nextR[k]][j + nextC[k]] === 1) {
//           box[i][j] = 1;
//           break;
//         } else if (box[i + nextR[k]][j + nextC[k]] < 0) {
//           noNext++;
//         }
//       }
//       // 상하좌우 토마토 다 없으면 숙성 불가, 게임 끝
//       if (noNext === 4) {
//         day = -1;
//         break;
//       }
//       // 오늘도 안익었어?
//       if (box[i][j] === 0) notYet++;
//       // console.log(`box[${i}][${j}] : `, box[i][j], 'notYet', notYet);
//     }
//   }
// }
// // 소요 일수 출력
// console.log(day);
