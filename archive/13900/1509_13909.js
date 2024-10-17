// https://www.acmicpc.net/problem/13909
/*
창문 닫기

서강대학교 컴퓨터공학과 실습실 R912호에는 현재 N개의 창문이 있고 또 N명의 사람이 있다. 1번째 사람은 1의 배수 번째 창문을 열려 있으면 닫고 닫혀 있으면 연다.  2번째 사람은 2의 배수 번째 창문을 열려 있으면 닫고 닫혀 있으면 연다. 이러한 행동을 N번째 사람까지 진행한 후 열려 있는 창문의 개수를 구하라. 단, 처음에 모든 창문은 닫혀 있다.

예를 들어 현재 3개의 창문이 있고 3명의 사람이 있을 때,

1번째 사람은 1의 배수인 1,2,3번 창문을 연다. (1, 1, 1)
2번째 사람은 2의 배수인 2번 창문을 닫는다. (1, 0, 1)
3번째 사람은 3의 배수인 3번 창문을 닫는다. (1, 0, 0)
결과적으로 마지막에 열려 있는 창문의 개수는 1개 이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
/**
 * 그냥 단순하게 N번까지 window 배열을 만들고 switch 작업 반복하면 메모리 초과 발생.
 * 테스트로 25를 넣고 위 작업한 배열을 살펴보니 1,4,9,16,25 순으로 창문이 열려있었다.
 => 이 규칙성으로 N 이내의 제곱수 개수를 구하는 식으로 접근 변경해 성공.

 * 1과 자기 자신을 제외한 약수를 2개 이상 가진 숫자는 약수들끼리 쌍을 이루기 때문에 무조건 닫히고 끝난다.
 => 제곱수들은 1과 자기자신을 제외하면 제곱근에 의해 단 1번만 열리고 아무도 건들지 않는다.
 */

const maxRoot = Math.floor(Math.sqrt(N));
console.log(maxRoot);

// 실패한 방법 - 메모리 초과 발생
const window = new Array(N + 1).fill(0);
for (let i = 1; i <= N; i++) {
  for (let j = i; j <= N; j += i) {
    window[j] = window[j] === 1 ? 0 : 1;
  }
}
// console.log(window);
const openedWindow = window.reduce((acc, v) => acc + v, 0);
console.log(openedWindow);
