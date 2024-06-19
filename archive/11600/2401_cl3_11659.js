// https://www.acmicpc.net/problem/11659
/*
구간 합 구하기 4

수 N개가 주어졌을 때, i번째 수부터 j번째 수까지 합을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input[0].split(' ').map(Number);
const nums = input[1].split(' ').map(Number);
// console.log(N, M, nums);
// console.log(input);

// 문제 로직
/**
 * 누적합 배열 만들어서 end 합에서 start 합 앞칸의 합 빼기
 
 * 매번 for문으로 단순하게 st~end idx 접근해서 합을 구하려고 하면
 최대 1~100,000 접근 최대 100,000번... O(N*M)=백억 => 시간 초과 !
*/

// 누적합 구하기
const arr = [0, ...nums];
const prefSum = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  prefSum[i] = prefSum[i - 1] + arr[i];
}
// console.log(prefSum);

// 작업 수행 (구간합 출력)
const result = [];
for (let i = 2; i < 2 + M; i++) {
  const [st, end] = input[i].split(' ').map(Number);
  const partSum = prefSum[end] - prefSum[st - 1];
  result.push(partSum);
}
console.log(result.join('\n'));
