// https://www.acmicpc.net/problem/5430
/*
AC

선영이는 주말에 할 일이 없어서 새로운 언어 AC를 만들었다. AC는 정수 배열에 연산을 하기 위해 만든 언어이다. 이 언어에는 두 가지 함수 R(뒤집기)과 D(버리기)가 있다.

함수 R은 배열에 있는 수의 순서를 뒤집는 함수이고, D는 첫 번째 수를 버리는 함수이다. 배열이 비어있는데 D를 사용한 경우에는 에러가 발생한다.

함수는 조합해서 한 번에 사용할 수 있다. 예를 들어, "AB"는 A를 수행한 다음에 바로 이어서 B를 수행하는 함수이다. 예를 들어, "RDD"는 배열을 뒤집은 다음 처음 두 수를 버리는 함수이다.

배열의 초기값과 수행할 함수가 주어졌을 때, 최종 결과를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(T, input);

// 테스트 케이스 분리
let idx = 0;
const test = [];
for (let i = 0; i < T; i++) {
  const p = input[idx++];
  const n = +input[idx++];
  const arr = JSON.parse(input[idx++]);
  test.push([p, n, arr]);
}
// console.log(test);

// 문제 로직 - 방법 2
/**
* 시간초과 안나게 매번 직접 reverse, shift 하지 않고 
원형배열 기준으로 처리과정 기억해서 마지막에 일괄 가공.

* JSON.parse(), JSON.stringify() 활용.
*/
// AC 언어 구현
function AC(p, n, arr) {
  let isReversed = false; // R() => 순서 뒤집기
  let startIdx = 0; // D() => 원형순 맨앞 자르기
  let endIdx = n - 1; // D() => 역순 맨앞(=원형 맨뒤) 자르기
  let isError = false; // 에러 여부
  for (let command of p) {
    if (command === 'R') isReversed = !isReversed;
    else {
      if (startIdx > endIdx) {
        isError = true; // 빈배열 뒤집고자 하면 error
        break;
      }
      if (isReversed) endIdx--;
      else startIdx++;
    }
  }
  if (isError) return 'error';
  const outputArr = arr.slice(startIdx, endIdx + 1);
  result = JSON.stringify(isReversed ? outputArr.reverse() : outputArr);
  return result;
}

// 작업 수행
const answer = [];
for (let t of test) {
  const [P, N, arr] = t;
  answer.push(AC(P, N, arr));
}
console.log(answer.join('\n'));

// 문제 로직 - 방법 1 : 단순하게 reverse, shift => 시간초과

// AC 언어 구현
function R(arr) {
  arr.reverse();
}
function D(arr) {
  if (!arr.length) return false;
  arr.shift();
  return true;
}

// 작업 수행
const answer1 = [];
for (let t of test) {
  const [P, _, arr] = t;
  let result = '';
  let isError = false;
  for (let p of P) {
    if (p === 'R') R(arr);
    else if (p === 'D') {
      if (!D(arr)) {
        result = 'error';
        isError = true;
        break;
      }
    }
  }
  if (!isError) result = '[' + arr.join(',') + ']';
  answer1.push(result);
}
console.log(answer1.join('\n'));
