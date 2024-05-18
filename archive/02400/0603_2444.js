// https://www.acmicpc.net/problem/2444
/*
별 찍기 - 7

예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

입력>
첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.
5

출력>
첫째 줄부터 2×N-1번째 줄까지 차례대로 별을 출력한다.
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = Number(require('fs').readFileSync(path));
// console.log(N);

//문제 로직
for (i = 1; i < N; i++) {
  let blank = ' '.repeat(N - i);
  let stars = '*'.repeat(i + (i - 1));
  console.log(blank + stars);
}
for (i = N; i > 0; i--) {
  let blank = ' '.repeat(N - i);
  let stars = '*'.repeat(i + i - 1);
  console.log(blank + stars);
}
