// https://www.acmicpc.net/problem/2775
/**
부녀회장이 될테야

이 아파트에 거주를 하려면 조건이 있는데, “a층의 b호에 살려면 자신의 아래(a-1)층의 1호부터 b호까지 사람들의 수의 합만큼 사람들을 데려와 살아야 한다” 는 계약 조항을 꼭 지키고 들어와야 한다.

아파트에 비어있는 집은 없고 모든 거주민들이 이 계약 조건을 지키고 왔다고 가정했을 때, 주어지는 양의 정수 k와 n에 대해 k층에 n호에는 몇 명이 살고 있는지 출력하라. 단, 아파트에는 0층부터 있고 각층에는 1호부터 있으며, 0층의 i호에는 i명이 산다.

입력>
첫 번째 줄에 Test case의 수 T가 주어진다. 그리고 각각의 케이스마다 입력으로 첫 번째 줄에 정수 k, 두 번째 줄에 정수 n이 주어진다
 */

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => +i);
const N = input.shift();
// console.log(N, input);

// 문제 로직
for (let i = 0; i < N; i++) {
  const k = input.shift();
  const n = input.shift();
  // console.log(`TEST${i + 1} ---- ${k} 층 ${n} 호`);
  const whole = []; // 모든 층 담을 배열
  // 0층 담기
  const floor0 = [];
  for (let j = 1; j <= n; j++) floor0.push(j);
  whole.push(floor0);

  // k층까지 담기
  for (let f = 1; f <= k; f++) {
    const floor = [];
    for (let r = 1; r <= n; r++) {
      let room = 0;
      for (let l = 0; l < r; l++) room += whole[f - 1][l];
      floor.push(room);
    }
    whole.push(floor);
  }

  // 출력
  console.log(whole[k][n - 1]);
}
