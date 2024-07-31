// https://www.acmicpc.net/problem/9465
/*
스티커

상근이의 여동생 상냥이는 문방구에서 스티커 2n개를 구매했다. 스티커는 그림 (a)와 같이 2행 n열로 배치되어 있다. 상냥이는 스티커를 이용해 책상을 꾸미려고 한다.

상냥이가 구매한 스티커의 품질은 매우 좋지 않다. 스티커 한 장을 떼면, 그 스티커와 변을 공유하는 스티커는 모두 찢어져서 사용할 수 없게 된다. 즉, 뗀 스티커의 왼쪽, 오른쪽, 위, 아래에 있는 스티커는 사용할 수 없게 된다.
...(a) ...(b)
모든 스티커를 붙일 수 없게된 상냥이는 각 스티커에 점수를 매기고, 점수의 합이 최대가 되게 스티커를 떼어내려고 한다. 먼저, 그림 (b)와 같이 각 스티커에 점수를 매겼다. 상냥이가 뗄 수 있는 스티커의 점수의 최댓값을 구하는 프로그램을 작성하시오. 즉, 2n개의 스티커 중에서 점수의 합이 최대가 되면서 서로 변을 공유 하지 않는 스티커 집합을 구해야 한다.

위의 그림의 경우에 점수가 50, 50, 100, 60인 스티커를 고르면, 점수는 260이 되고 이 것이 최대 점수이다. 가장 높은 점수를 가지는 두 스티커 (100과 70)은 변을 공유하기 때문에, 동시에 뗄 수 없다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(T);

// 문제 로직
/**
 * DP[c][r] : 
 * 하나의 열[c]에서 고를 수 있는 경우 3가지
- 안 선택,    // r=0
- 윗줄 선택,  // r=1
- 아랫줄 선택 // r=2
 * 그 다음 dp 배열에서 하나의 열에서 고를 수 있는 경우는 아래 3가지
- 안 선택 -> + 이전 열의 최댓값 (아무것도 고르지 않았으니 최대값을 고르면 된다)
- 윗줄 선택 -> + 이전 열에서 안고른 경우, 이전 열에서 아래 행 골랐을 경우 중 최대값
- 아랫줄 선택 -> + 이전 열에서 안고른 경우, 이전 열에서 위에 행 골랐을 경우 중 최대값
*/
const result = [];
for (let i = 0; i < T; i++) {
  let n = +input[i * 3];
  let line1 = input[i * 3 + 1].split(' ').map(Number);
  let line2 = input[i * 3 + 2].split(' ').map(Number);

  const dp = [[0, line1[0], line2[0]]]; // 각 열 - 안선택, 윗줄 선택, 아랫줄 선택
  for (let j = 1; j < n; j++) {
    dp[j] = [
      Math.max(...dp[j - 1]),
      Math.max(dp[j - 1][0], dp[j - 1][2]) + line1[j],
      Math.max(dp[j - 1][0], dp[j - 1][1]) + line2[j],
    ];
  }
  // console.log(dp);
  result.push(Math.max(...dp[n - 1]));
}
console.log(result.join('\n'));
