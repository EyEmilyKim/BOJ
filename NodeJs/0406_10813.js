// https://www.acmicpc.net/problem/10813
/*
공 바꾸기

첫째 줄에 N (1 ≤ N ≤ 100)과 M (1 ≤ M ≤ 100)이 주어진다.

둘째 줄부터 M개의 줄에 걸쳐서 공을 교환할 방법이 주어진다. 각 방법은 두 정수 i j로 이루어져 있으며, i번 바구니와 j번 바구니에 들어있는 공을 교환한다는 뜻이다. (1 ≤ i ≤ j ≤ N)

도현이는 입력으로 주어진 순서대로 공을 교환한다.

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
// console.log(N, M);

// 문제 로직
let arr = [];
for (n = 1; n <= N; n++) {
  arr.push(n);
}
// console.log(arr);
for (m = 1; m <= M; m++) {
  let tmp = 0;
  let i = +input[m][0];
  let j = +input[m][1];
  tmp = arr[i - 1];
  arr[i - 1] = arr[j - 1];
  arr[j - 1] = tmp;
  // console.log(arr);
}
let result = '';
arr.forEach((i) => (result += i + ' '));
console.log(result.trim());
