// https://www.acmicpc.net/problem/2559
/*
수열

매일 아침 9시에 학교에서 측정한 온도가 어떤 정수의 수열로 주어졌을 때, 연속적인 며칠 동안의 온도의 합이 가장 큰 값을 알아보고자 한다.

예를 들어, 아래와 같이 10일 간의 온도가 주어졌을 때,

3 -2 -4 -9 0 3 7 13 8 -3

모든 연속적인 이틀간의 온도의 합은 아래와 같다.
...

이때, 온도의 합이 가장 큰 값은 21이다.

또 다른 예로 위와 같은 온도가 주어졌을 때, 모든 연속적인 5일 간의 온도의 합은 아래와 같으며,
...

이때, 온도의 합이 가장 큰 값은 31이다.

매일 측정한 온도가 정수의 수열로 주어졌을 때, 연속적인 며칠 동안의 온도의 합이 가장 큰 값을 계산하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [N, K] = input[0];
const data = input[1];
// console.log(N, K, data);

// 문제 로직
/**
 * 누적합.
 * 미리 전체 누적합을 구해두고, idx 별로 여분의 누적합 제하기
 */

const prefixSum = [0]; // 0~ idx 까지의 전체 누적합
for (let i = 1; i <= N; i++) {
  prefixSum[i] = prefixSum[i - 1] + data[i - 1];
}

let max = Number.MIN_SAFE_INTEGER;
for (let i = K; i <= N; i++) {
  max = Math.max(max, prefixSum[i] - prefixSum[i - K]);
}
console.log(max);
