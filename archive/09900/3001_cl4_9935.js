// https://www.acmicpc.net/problem/9935
/*
문자열 폭발

상근이는 문자열에 폭발 문자열을 심어 놓았다. 폭발 문자열이 폭발하면 그 문자는 문자열에서 사라지며, 남은 문자열은 합쳐지게 된다.

폭발은 다음과 같은 과정으로 진행된다.

문자열이 폭발 문자열을 포함하고 있는 경우에, 모든 폭발 문자열이 폭발하게 된다. 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만든다.
새로 생긴 문자열에 폭발 문자열이 포함되어 있을 수도 있다.
폭발은 폭발 문자열이 문자열에 없을 때까지 계속된다.
상근이는 모든 폭발이 끝난 후에 어떤 문자열이 남는지 구해보려고 한다. 남아있는 문자가 없는 경우가 있다. 이때는 "FRULA"를 출력한다.

폭발 문자열은 같은 문자를 두 개 이상 포함하지 않는다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [word, bomb] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(`${word}\n${bomb}`);

// 문제 로직
/**
 * replace 함수 반복으로는 시간 초과 
=> 문자열 입력 길이 최대 1,000,000... O(N^2) 복잡도로는 해결 불가

 * 스택 활용
1. 문자열 순회하며 스택에 하나씩 담는데, 현재 문자가 폭발문자열의 끝 문자와 같다면
2. 스택 마지막 덩어리 확인, 폭발문자열이면 제거
3. 마지막에 stack join 출력, 빈 문자열이면 'FRULA' 출력.
 */

const len = bomb.length;
const stack = [];

for (let i = 0; i < word.length; i++) {
  const cur = word[i];
  stack.push(cur);
  if (cur === bomb[len - 1]) {
    let block = stack.slice(-len).join('');
    if (block === bomb) stack.splice(-len);
  }
}

console.log(stack.length ? stack.join('') : 'FRULA');
