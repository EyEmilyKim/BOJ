// https://www.acmicpc.net/problem/10810
/*
공 넣기

첫째 줄에 N (1 ≤ N ≤ 100)과 M (1 ≤ M ≤ 100)이 주어진다.

둘째 줄부터 M개의 줄에 걸쳐서 공을 넣는 방법이 주어진다. 각 방법은 세 정수 i j k로 이루어져 있으며, i번 바구니부터 j번 바구니까지에 k번 번호가 적혀져 있는 공을 넣는다는 뜻이다. 예를 들어, 2 5 6은 2번 바구니부터 5번 바구니까지에 6번 공을 넣는다는 뜻이다. (1 ≤ i ≤ j ≤ N, 1 ≤ k ≤ N)

도현이는 입력으로 주어진 순서대로 공을 넣는다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .split(/\r?\n/)
  .map((row) => row.split(' '));
// console.log(input);
const N = +input[0][0]; // 5
const M = +input[0][1]; // 4

// 문제 로직
let arr = [];
for (n = 1; n <= N; n++) {
  arr.push(0);
}
// console.log(arr);
for (m = 1; m <= M; m++) {
  const i = +input[m][0];
  const j = +input[m][1];
  const k = +input[m][2];
  for (d = i; d <= j; d++) {
    arr[d - 1] = k;
  }
  // console.log(arr);
}
// console.log(arr);
let result = '';
arr.forEach((i) => (result += i + ' '));
console.log(result.trim());
