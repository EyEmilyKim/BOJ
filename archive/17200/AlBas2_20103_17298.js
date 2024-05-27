// https://www.acmicpc.net/problem/17298
/*
오큰수

크기가 N인 수열 A = A1, A2, ..., AN이 있다. 수열의 각 원소 Ai에 대해서 오큰수 NGE(i)를 구하려고 한다. Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미한다. 그러한 수가 없는 경우에 오큰수는 -1이다.

예를 들어, A = [3, 5, 2, 7]인 경우 NGE(1) = 5, NGE(2) = 7, NGE(3) = 7, NGE(4) = -1이다. A = [9, 5, 4, 8]인 경우에는 NGE(1) = -1, NGE(2) = 8, NGE(3) = 8, NGE(4) = -1이다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const nums = input[1].split(' ').map((i) => +i);
// console.log(N, nums, '\n====');

// 문제 로직 - 방법 2 : 스택 사용
/**
 nums 배열 앞에서부터 오큰수 못찾은 애(index)를 스택에 담아놓고
 다음 값과 스택 잔존 값들 차례로 비교, pop하여 result 에 오큰수 저장.
 한번의 스캔으로 해결 => O(N)
 */
const stack = []; // 오큰수 못찾은 수의 index 저장
const result = new Array(N).fill(-1); // 원배열 각 요소 대응하는 오큰수 저장
// 배열 순회하며 오큰수 찾기
const len = nums.length;
for (let i = 0; i <= len - 1; i++) {
  const current = nums[i];
  while (stack.length && current > nums[stack[stack.length - 1]]) {
    result[stack.pop()] = current;
  }
  stack.push(i);
  // console.log('idx', i, 'num', nums[i]);
  // console.log('stack', stack);
  // console.log('result', result, '\n----');
}
// 출력
console.log(result.join(' '));

// 문제 로직 - 방법 1 : 2중 반복문 O(N^2) => 시간초과
const okns = [];
const len1 = nums.length;
for (let i = 0; i < len1; i++) {
  let okn = -1;
  for (let j = i + 1; j < len1; j++) {
    if (nums[j] > nums[i]) {
      okn = nums[j];
      break;
    }
  }
  okns.push(okn);
}
console.log(okns.join(' '));
