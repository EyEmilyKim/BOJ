// https://www.acmicpc.net/problem/2441
/*
별 찍기 - 4

첫째 줄에는 별 N개, 둘째 줄에는 별 N-1개, ..., N번째 줄에는 별 1개를 찍는 문제

하지만, 오른쪽을 기준으로 정렬한 별(예제 참고)을 출력하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
const result = [];
let n = N;
for (let i = 0; i < N; i++) {
  let str = '';
  let blank = N - n;
  for (let j = 0; j < blank; j++) {
    str += ' ';
  }
  for (let k = 0; k < n; k++) {
    str += '*';
  }
  result.push(str);
  n--;
}
console.log(result.join('\n'));
