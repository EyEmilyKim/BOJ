// https://www.acmicpc.net/problem/27522
/*
카트라이더: 드리프트

...

당신은 스피드전 스쿼드의 승리 팀을 구하는 임무를 맡았다. 스쿼드는 레드팀 4명과 블루팀 4명으로 이루어진 8명의 레이서가 플레이하는 모드이다. 또한 스피드전에서는 각 팀원의 순위 점수의 합계가 높은 팀이 승리하며, 만일 합계가 같다면 최고 순위가 가장 높은 팀이 승리한다. 참고로 아래 순위 점수표를 확인해보면, 8명의 레이서가 모두 서로 다른 시각에 완주한 경우 순위 점수의 합계가 반드시 다르다.

표 1. 카트라이더: 드리프트 스피드전 순위 점수
순위	1st	2nd	3rd	4th	5th	6th	7th	8th	Retire
점수	 10	  8	  6	  5	  4	  3	  2	  1	  0

원래 1위 레이서가 완주한 순간부터 10초가 지나기 전에 완주하지 못하면 리타이어되지만, 이 문제에서는 모든 레이서의 실력이 뛰어나기 때문에 아무도 리타이어하지 않는다. 또한 모든 레이서가 반드시 서로 다른 시각에 완주한다. 스피드전 스쿼드에 참가한 8명의 레이서에 대해 완주 기록과 속한 팀이 주어졌을 때, 아래 순위 점수표를 참고하여 승리팀이 어디인지 판단해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' '));
// console.log(input);

// 문제 로직
// 완주기록 입력
const record = [];
for (let rec of input) {
  const [M, SS, sss] = rec[0].split(':').map(Number);
  const t = rec[1];
  record.push([[M, SS, sss], t]);
}
// 선착순부터 정렬
record.sort((a, b) => {
  if (a[0][0] === b[0][0]) {
    if (a[0][1] === b[0][1]) return a[0][2] - b[0][2];
    return a[0][1] - b[0][1];
  } else return a[0][0] - b[0][0];
});
// console.log(record);
// 등수 점수 합산하기
let point = {
  1: 10,
  2: 8,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
  7: 2,
  8: 1,
};
// console.log(point);
let red = 0;
let blue = 0;
record.forEach((i, idx) => {
  const p = point[idx + 1];
  if (i[1] === 'R') red += p;
  else blue += p;
});
// console.log('red', red, 'blue', blue);
// 승리팀 출력
console.log(red > blue ? 'Red' : 'Blue');
