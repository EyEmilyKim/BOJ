// https://www.acmicpc.net/problem/17299
/*
오등큰수

크기가 N인 수열 A = A1, A2, ..., AN이 있다. 수열의 각 원소 Ai에 대해서 오등큰수 NGF(i)를 구하려고 한다.

Ai가 수열 A에서 등장한 횟수를 F(Ai)라고 했을 때, Ai의 오등큰수는 오른쪽에 있으면서 수열 A에서 등장한 횟수가 F(Ai)보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미한다. 그러한 수가 없는 경우에 오등큰수는 -1이다.

예를 들어, A = [1, 1, 2, 3, 4, 2, 1]인 경우 F(1) = 3, F(2) = 2, F(3) = 1, F(4) = 1이다. A1의 오른쪽에 있으면서 등장한 횟수가 3보다 큰 수는 없기 때문에, NGF(1) = -1이다. A3의 경우에는 A7이 오른쪽에 있으면서 F(A3=2) < F(A7=1) 이기 때문에, NGF(3) = 1이다. NGF(4) = 2, NGF(5) = 2, NGF(6) = 1 이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const nums = input[1].split(' ').map(Number);
// console.log(N, nums);

// 문제 로직

// 등장 횟수 F(Ai) 딕셔너리
const Fx = nums.reduce((acc, i, idx) => {
  acc[i] = (acc[i] | 0) + 1;
  return acc;
}, {});
// console.log(Fx, '\n---------');

// 스택에 비교, 저장하며 오등큰수 찾기
const stack = [];
const result = new Array(nums.length).fill(-1);
nums.forEach((i, idx) => {
  if (!stack.length) {
    stack.push(idx);
    // console.log(i, stack);
  } else {
    while (stack.length && Fx[nums[stack[stack.length - 1]]] < Fx[i]) {
      // console.log(
      //   `F(${nums[stack[stack.length - 1]]})`,
      //   Fx[nums[stack[stack.length - 1]]],
      //   `< F(${i})`,
      //   Fx[i]
      // );
      result[stack.pop()] = i;
    }
    stack.push(idx);
    // console.log(i, stack);
  }
});
console.log(result.join(' '));
