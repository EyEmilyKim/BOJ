// https://www.acmicpc.net/problem/9095
/*
1, 2, 3 더하기

정수 4를 1, 2, 3의 합으로 나타내는 방법은 총 7가지가 있다. 합을 나타낼 때는 수를 1개 이상 사용해야 한다.
1+1+1+1
1+1+2
1+2+1
2+1+1
2+2
1+3
3+1
정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const T = input.shift();
// console.log(T, input);

// 문제 로직
/**
 * DP
 * 1,2,3,4,5까지 예시에 따라 가능한 경우의 수를 구해보면
 1 => 1 (1*)
 2 => 2 (11, 2*)
 3 => 4 (111, 12, 21, 3*)
 4 => 7 (1111, 112, 121, 211, 13, 31, 22)
 5 => 13 (11111, 1112, 1121, 1211, 2111, 113, 131, 311, 23, 32, 221, 212, 122)
 ...
 => 규칙성 : X 보다 작은 3개 수의 경우의 수 합 !

 * 패턴 진행 같으므로 입력값 최대치까지 필요한 값 구해놓자
*/

// 가장 큰 타겟값까지 경우의 수 구하기
const max = Math.max(...input);
const memo = new Array(max + 1).fill(0);
memo[1] = 1;
memo[2] = 2;
memo[3] = 4;
for (let i = 4; i <= max; i++) {
  memo[i] = memo[i - 1] + memo[i - 2] + memo[i - 3];
}
// console.log(memo);

// 테스트 케이스 순회하며 답 구하기
const result = [];
input.forEach((t) => result.push(memo[t]));
console.log(result.join('\n'));
