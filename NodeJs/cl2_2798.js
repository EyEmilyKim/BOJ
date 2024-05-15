// https://www.acmicpc.net/problem/2798
/*
블랙잭

김정인 버전의 블랙잭에서 각 카드에는 양의 정수가 쓰여 있다. 그 다음, 딜러는 N장의 카드를 모두 숫자가 보이도록 바닥에 놓는다. 그런 후에 딜러는 숫자 M을 크게 외친다.

이제 플레이어는 제한된 시간 안에 N장의 카드 중에서 3장의 카드를 골라야 한다. 블랙잭 변형 게임이기 때문에, 플레이어가 고른 카드의 합은 M을 넘지 않으면서 M과 최대한 가깝게 만들어야 한다.

N장의 카드에 써져 있는 숫자가 주어졌을 때, M을 넘지 않으면서 M에 최대한 가까운 카드 3장의 합을 구해 출력하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input[0].split(' ').map((val) => +val);
const cards = input[1].split(' ').map((val) => +val);
// console.log(N, M);
// console.log(cards);

// 문제 로직
const sums = [];
for (let i = 0; i < N - 2; i++) {
  const first = cards[i];
  if (first >= M - 1 - 2) continue;
  for (let j = i + 1; j < N - 1; j++) {
    const second = cards[j];
    if (first + second >= M) continue;
    for (let l = j + 1; l < N; l++) {
      const sum = first + second + cards[l];
      if (sum <= M) sums.push(sum);
    }
  }
}
console.log(Math.max(...sums));

/**
 * 로직은 맞는데 자꾸 시간초과가 떠서 
 배열에 sum 추가하는 조건에 && 로 넣었던 중복 방지 검사를 없앴다.
 */
