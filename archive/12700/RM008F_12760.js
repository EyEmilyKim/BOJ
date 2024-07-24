// https://www.acmicpc.net/problem/12760
/*
최후의 승자는 누구?

수많은 토너먼트를 거쳐 최종 플레이어 N명이 남아있다. 각 플레이어는 M장씩의 숫자가 적힌 카드를 가지고 있으며, 이들은 매 턴 자신이 가진 카드 중 가장 큰 카드를 두고 비교를 하는데, 그 카드들 중 가장 큰 수를 가진 플레이어가 1점을 획득한다. 그 턴에 사용된 카드는 버리기로 한다. 가장 큰 수를 가진 플레이어는 여러 명일 수 있다. M번의 경기 후 가장 많은 점수를 획득한 플레이어는 몇 번 플레이어인가?

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
const cards = input.map((i) =>
  i
    .split(' ')
    .map(Number)
    .sort((a, b) => b - a)
);
// console.log(N, M, cards);

// 문제 로직
const score = new Array(N).fill(0); // 누적 점수
for (let i = 0; i < M; i++) {
  const turn = []; // 각 턴 각 플레이어의 카드
  for (let c of cards) turn.push(c[i]);
  // console.log('turn', turn);
  const max = Math.max(...turn); // 최대값
  turn.forEach((v, idx) => {
    if (v === max) score[idx]++; // 최대값 카드 가진 플레이어 +1점
  });
  // console.log('score', score);
}
const maxScore = Math.max(...score); // 최고점
const winner = [];
score.forEach((v, idx) => {
  if (v === maxScore) winner.push(idx + 1); // 최고 득점자 추출
});
console.log(winner.join(' ')); // 출력
