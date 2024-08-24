// https://www.acmicpc.net/problem/17626
/*
Four Squares

라그랑주는 1770년에 모든 자연수는 넷 혹은 그 이하의 제곱수의 합으로 표현할 수 있다고 증명하였다. 어떤 자연수는 복수의 방법으로 표현된다. 예를 들면, 26은 5^2과 1^2의 합이다; 또한 4^2 + 3^2 + 1^2으로 표현할 수도 있다. 역사적으로 암산의 명수들에게 공통적으로 주어지는 문제가 바로 자연수를 넷 혹은 그 이하의 제곱수 합으로 나타내라는 것이었다. 1900년대 초반에 한 암산가가 15663 = 125^2 + 6^2 + 1^2 + 1^2라는 해를 구하는데 8초가 걸렸다는 보고가 있다. 좀 더 어려운 문제에 대해서는 56초가 걸렸다: 11339 = 105^2 + 15^2 + 8^2 + 5^2.

자연수 n이 주어질 때, n을 최소 개수의 제곱수 합으로 표현하는 컴퓨터 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
/**
 * dp[N] : 더해서 N 이 되는 제곱수 개수의 최소값.
=> N = n^2 이면 dp[N] = 1
 * N 은 제곱수들의 합이므로 
=> dp[N] = dp[n^2] + dp[N-n^2] => dp[N-n^2] + 1 이 성립.
 * 하지만, n^2 의 n 을 어떤 자연수를 골라야 dp[N] 이 최소값이 될지 알 수 없다
=> 브루트포스 : x^2 <= n 인 x 다 구해보고 최소값 갱신
*/

const dp = new Array(N + 1).fill(0);
dp[1] = 1;
for (let i = 2; i <= N; i++) {
  let min = 4;
  for (let j = 1; j * j <= i; j++) {
    min = Math.min(min, dp[i - j * j]);
  }
  dp[i] = min + 1;
}
console.log(dp[N]);
