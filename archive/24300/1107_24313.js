// https://www.acmicpc.net/problem/24313
/*
알고리즘 수업 - 점근적 표기 1

O(g(n)) = {f(n) | 모든 n ≥ n0에 대하여 f(n) ≤ c × g(n)인 양의 상수 c와 n0가 존재한다}
이 정의는 실제 O-표기법(https://en.wikipedia.org/wiki/Big_O_notation)과 다를 수 있다.

함수 f(n) = a1n + a0, 양의 정수 c, n0가 주어질 경우 O(n) 정의를 만족하는지 알아보자.

입력>
첫째 줄에 함수 f(n)을 나타내는 정수 a1, a0가 주어진다. (0 ≤ |ai| ≤ 100)
다음 줄에 양의 정수 c가 주어진다. (1 ≤ c ≤ 100)
다음 줄에 양의 정수 n0가 주어진다. (1 ≤ n0 ≤ 100)

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [a1, a0] = input[0].split(' ').map(Number);
const c = +input[1];
const n0 = +input[2];
// console.log(a1, a0, c, n0);

// 문제 로직

/**
 * O(g(n)) = {f(n) | 모든 n ≥ n0에 대하여 f(n) ≤ c × g(n)인 양의 상수 c와 n0가 존재한다}
 
 * 함수 f(n) = a1n + a0

 * O(n) 정의를 만족하는지 알아보자
 => g(n) = n

 조건식 : 
 a1n + a0 < cn
 a0 <= (c-a1)n
 */

/**
 위에서 도출된 a0 조건에 더하여
 (0 ≤ |ai| ≤ 100) , (1 ≤ n0 ≤ 100) 이므로
 -100 <= a0 <= 100
 0 <= a0 + 100 <= (c-a1)n + 100 
 결국 (c-a1)n + 100 은 양수
 모든 n ≥ n0에 대하여 조건이 충족되려면 n도 양의 정수일 것이므로 
 (c-a1) >= 0
 c >= a1
 */

function f(n) {
  const result = a1 * n + a0;
  // console.log(`f(${n})`, result);
  return result;
}

function O(n) {
  let isTrue = 1;
  for (target = n; target >= n0; target--) {
    const compare = c * target;
    // console.log(`f(${target})`, f(target), `c* ${target}`, compare);
    if (f(target) <= compare && c >= a1) continue;
    else {
      isTrue = 0;
      break;
    }
  }
  return isTrue;
}

console.log(O(n0));
