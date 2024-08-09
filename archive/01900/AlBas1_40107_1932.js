// https://www.acmicpc.net/problem/1932
/*
정수 삼각형

위 그림은 크기가 5인 정수 삼각형의 한 모습이다.

맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라. 아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.

삼각형의 크기는 1 이상 500 이하이다. 삼각형을 이루고 있는 각 수는 모두 정수이며, 범위는 0 이상 9999 이하이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const n = +input.shift();
const tri = input.map((i) => i.split(' ').map(Number));
// console.log(n, tri);

// 문제 로직
/**
 * dp[r][c] : r행 c열 노드로 내려오기까지의 최대 누적합
 */
const dp = Array.from(new Array(n), () => []);
dp[0] = tri[0];
for (let i = 1; i < n; i++) {
  // 둘째 단부터 아래로
  for (let j = 0; j < tri[i].length; j++) {
    // 각 노드
    if (j === 0) dp[i][j] = dp[i - 1][j] + tri[i][j]; // 제일 왼쪽
    else if (j === tri[i].length - 1) dp[i][j] = dp[i - 1][j - 1] + tri[i][j]; // 제일 오른쪽
    else dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + tri[i][j]; // 그 외
  }
}
// console.log(dp);
console.log(Math.max(...dp[n - 1]));
