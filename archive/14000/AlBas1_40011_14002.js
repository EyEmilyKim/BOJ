// https://www.acmicpc.net/problem/14002
/*
가장 긴 증가하는 부분 수열 4

수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.
예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

입력>
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.
둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)

출력>
첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.
둘째 줄에는 가장 긴 증가하는 부분 수열을 출력한다. 그러한 수열이 여러가지인 경우 아무거나 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const [...A] = input[1].split(' ').map(Number);
// console.log(N, A);

// 문제 로직
/**
 * DP
 * 11053번 "가장 긴 증가하는 부분 수열" 문제 참고
 * 여기서는 DP 배열과 max에 증가하는 부분 수열의 최대 길이가 아닌 그 수열을 직접 저장.

*/

// dp 배열 준비
// dp[i] : A[i]까지의 부분 배열에서 증가하는 부분 수열
// 최소한 모두 자기자신을 부분 배열의 요소로 가짐.
const dp = new Array(N);
for (let i = 0; i < N; i++) dp[i] = [A[i]];
// 가능한 최대 길이의 증가하는 부분 수열 저장할 변수 초기화
let maxArr = [dp[0]];
// A 배열 순회하며 dp, maxArr 갱신
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    // 자기보다 작은 숫자가 앞에 오면
    if (A[j] < A[i]) {
      // 그 dp가 최대길이 증가수열일 경우 그 수열에 자신을 이어 붙임
      if (dp[i].length < dp[j].length + 1) dp[i] = [...dp[j], A[i]];
    }
  }
  // 최대길이 증가부분수열 갱신
  if (dp[i].length > maxArr.length) maxArr = dp[i];

  // console.log('i', i, 'A[i]', A[i]);
  // console.log('dp', dp);
  // console.log('maxArr', maxArr);
}
// 출력
console.log(`${maxArr.length}\n${maxArr.join(' ')}`);
