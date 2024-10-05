// https://www.acmicpc.net/problem/2529
/*
부등호

두 종류의 부등호 기호 ‘<’와 ‘>’가 k개 나열된 순서열 A가 있다. 우리는 이 부등호 기호 앞뒤에 서로 다른 한 자릿수 숫자를 넣어서 모든 부등호 관계를 만족시키려고 한다. 예를 들어, 제시된 부등호 순서열 A가 다음과 같다고 하자. 

A ⇒ < < < > < < > < >

부등호 기호 앞뒤에 넣을 수 있는 숫자는 0부터 9까지의 정수이며 선택된 숫자는 모두 달라야 한다. 아래는 부등호 순서열 A를 만족시키는 한 예이다. 

3 < 4 < 5 < 6 > 1 < 2 < 8 > 7 < 9 > 0

이 상황에서 부등호 기호를 제거한 뒤, 숫자를 모두 붙이면 하나의 수를 만들 수 있는데 이 수를 주어진 부등호 관계를 만족시키는 정수라고 한다. 그런데 주어진 부등호 관계를 만족하는 정수는 하나 이상 존재한다. 예를 들어 3456128790 뿐만 아니라 5689023174도 아래와 같이 부등호 관계 A를 만족시킨다. 

5 < 6 < 8 < 9 > 0 < 2 < 3 > 1 < 7 > 4

여러분은 제시된 k개의 부등호 순서를 만족하는 (k+1)자리의 정수 중에서 최댓값과 최솟값을 찾아야 한다. 앞서 설명한 대로 각 부등호의 앞뒤에 들어가는 숫자는 { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }중에서 선택해야 하며 선택된 숫자는 모두 달라야 한다. 


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const K = +input[0];
const inequality = input[1].split(' ');
// console.log(K, inequality);

// 문제 로직
/**
 * 브루트포스. (범위 2<= K <=9)
 * 숫자 0~9 모두 대입하며 최소 & 최대 부등호 만족수 찾기
 */

function solution(K, inequality) {
  const visited = new Array(10).fill(0); // 숫자 0~9 사용 여부
  let max = String(Number.MIN_SAFE_INTEGER);
  let min = String(Number.MAX_SAFE_INTEGER);

  // 숫자 0~9 모두 대입하며 최소 & 최대 부등호 만족수 찾기
  for (let i = 0; i < 10; i++) {
    visited[i] = 1;
    recursive(0, i, `${i}`);
    visited[i] = 0;
  }
  return `${max}\n${min}`;

  // 작업할 idx, 앞 숫자와 문자열 받아서 부등호 만족수 완성, 비교하는 재귀함수
  function recursive(idx, prevNum, str) {
    // console.log(visited.join('_'), 'idx', idx, 'prevNum', prevNum, str);

    if (idx === K) {
      // 모든 부등호 관계 완성했다면 최대값, 최소값 갱신
      max = str > max ? str : max;
      min = str < min ? str : min;
      return;
    }
    if (inequality[idx] === '<') {
      // 부등호가 '<' 이면 앞 숫자보다 큰 숫자 중 다음 수 찾기
      for (let i = prevNum + 1; i <= 9; i++) {
        if (visited[i]) continue;
        visited[i] = 1;
        recursive(idx + 1, i, str + i);
        visited[i] = 0;
      }
    } else {
      // 부등호가 '>' 이면 앞 숫자보다 작은 숫자 중 다음 수 찾기
      for (let i = prevNum - 1; i >= 0; i--) {
        if (visited[i]) continue;
        visited[i] = 1;
        recursive(idx + 1, i, str + i);
        visited[i] = 0;
      }
    }
    return;
  }
}

// 작업 수행
const result = solution(K, inequality);
console.log(result);
