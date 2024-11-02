// https://www.acmicpc.net/problem/12865
/*
평범한 배낭

이 문제는 아주 평범한 배낭에 관한 문제이다.

한 달 후면 국가의 부름을 받게 되는 준서는 여행을 가려고 한다. 세상과의 단절을 슬퍼하며 최대한 즐기기 위한 여행이기 때문에, 가지고 다닐 배낭 또한 최대한 가치 있게 싸려고 한다.

준서가 여행에 필요하다고 생각하는 N개의 물건이 있다. 각 물건은 무게 W와 가치 V를 가지는데, 해당 물건을 배낭에 넣어서 가면 준서가 V만큼 즐길 수 있다. 아직 행군을 해본 적이 없는 준서는 최대 K만큼의 무게만을 넣을 수 있는 배낭만 들고 다닐 수 있다. 준서가 최대한 즐거운 여행을 하기 위해 배낭에 넣을 수 있는 물건들의 가치의 최댓값을 알려주자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, K], ...items] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, K, items);

// 문제 로직
/**
 * DP
모든 아이템 순회하며, 허용 무게를 세세히 쪼개어 보면서 최대 무게 채워나감.
이전까지의 최대값 dp 참고해 지금의 것을 추가로 넣을지 말지 판단, 최종 결과 구하기.
 */

// dp[i][j] : (1부터 차례로) i번째 아이템 고민하면서 j무게 만큼 아이템들 담을 때 얻을 수 있는 최대 효용값.
const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));

// 아이템들 차례로 순회하면서
for (let i = 1; i <= N; i++) {
  const [W, V] = items[i - 1];
  // 무게 제한 내로 담을 수 있을지 차근차근 보는데.. (j: 추가 허용 무게)
  for (let j = 1; j <= K; j++) {
    if (j - W < 0) {
      // 허용 무게에 여유가 안되면 지금 아이템 넣을 수 없음 => 이전 최대값 유지
      dp[i][j] = dp[i - 1][j];
    } else {
      // 지금 아이템 넣을 수 있음, 근데 이제..
      // => (이전 최대값) vs (지금 아이템 + 나머지 딴거 MAX) 가치 최대값 비교
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - W] + V);
    }
  }
}
// console.log(dp.map((r) => r.join(' ')).join('\n'));

// 결과 출력
console.log(dp[N][K]);
