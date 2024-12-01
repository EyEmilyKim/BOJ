// https://www.acmicpc.net/problem/14888
/*
연산자 끼워넣기

N개의 수로 이루어진 수열 A1, A2, ..., AN이 주어진다. 또, 수와 수 사이에 끼워넣을 수 있는 N-1개의 연산자가 주어진다. 연산자는 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)으로만 이루어져 있다.

우리는 수와 수 사이에 연산자를 하나씩 넣어서, 수식을 하나 만들 수 있다. 이때, 주어진 수의 순서를 바꾸면 안 된다.

예를 들어, 6개의 수로 이루어진 수열이 1, 2, 3, 4, 5, 6이고, 주어진 연산자가 덧셈(+) 2개, 뺄셈(-) 1개, 곱셈(×) 1개, 나눗셈(÷) 1개인 경우에는 총 60가지의 식을 만들 수 있다. 예를 들어, 아래와 같은 식을 만들 수 있다.

1+2+3-4×5÷6
1÷2+3+4-5×6
1+2÷3×4-5+6
1÷2×3-4+5+6

식의 계산은 연산자 우선 순위를 무시하고 앞에서부터 진행해야 한다. 또, 나눗셈은 정수 나눗셈으로 몫만 취한다. 음수를 양수로 나눌 때는 C++14의 기준을 따른다. 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다. 이에 따라서, 위의 식 4개의 결과를 계산해보면 아래와 같다.

1+2+3-4×5÷6 = 1
1÷2+3+4-5×6 = 12
1+2÷3×4-5+6 = 5
1÷2×3-4+5+6 = 7
N개의 수와 N-1개의 연산자가 주어졌을 때, 만들 수 있는 식의 결과가 최대인 것과 최소인 것을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N], nums, operators] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(N, nums, operators); // operators: +,-,×,÷ 의 개수

// 문제 로직
/**
 * 백트래킹
 */

// prettier-ignore
const calculate = {
  0 : (a, b) => { return a+b }, // 덧셈
  1 : (a, b) => { return a-b }, // 뺄셈
  2 : (a, b) => { return a*b }, // 곱셈
  3 : (a, b) => { return parseInt(a/b) }, // 나눗셈
}

let max = Number.MIN_SAFE_INTEGER;
let min = Number.MAX_SAFE_INTEGER;

function dfs(cnt, output) {
  // 연산자 개수만큼 반복하다가 max, min 판정
  if (cnt === N - 1) {
    max = Math.max(max, output);
    min = Math.min(min, output);
  } else {
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === 0) continue;
      operators[i]--; // 연산자 하나 꺼내서 사용
      dfs(cnt + 1, calculate[i](output, nums[cnt + 1]));
      operators[i]++; // 연산자 원상 복구
    }
  }
}

dfs(0, nums[0]);
console.log(`${max ? max : 0}\n${min ? min : 0}`); // 0 과 -0 은 false 취급되므로 주의
