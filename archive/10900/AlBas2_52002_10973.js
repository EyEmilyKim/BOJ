// https://www.acmicpc.net/problem/10973
/*
이전 순열

1부터 N까지의 수로 이루어진 순열이 있다. 이때, 사전순으로 바로 이전에 오는 순열을 구하는 프로그램을 작성하시오.

사전 순으로 가장 앞서는 순열은 오름차순으로 이루어진 순열이고, 가장 마지막에 오는 순열은 내림차순으로 이루어진 순열이다.

N = 3인 경우에 사전순으로 순열을 나열하면 다음과 같다.

- 1, 2, 3
- 1, 3, 2
- 2, 1, 3
- 2, 3, 1
- 3, 1, 2
- 3, 2, 1

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const arr = input[1].split(' ').map(Number);
// console.log(N, arr);

// 문제 로직
/**
 * 브루트 포스.
 * 사전순으로 이전에 오는 순열 구하기
1. 순열 뒤에서부터 볼 때 내림차순이 아닌 숫자가 놓인 index i 를 찾는다
2. index i 뒤의 수 중 arr[i] 보다 작은 가장 큰 값이 놓인 index j 를 찾는다
3. arr[i] 와 arr[j] 의 값을 swap 한다
4. 순열 맨앞부터 arr[i] 까지는 그대로 가져가고, 
  arr[i+1]부터 순열 맨 마지막까지는 내림차순으로 정리하여 이어 붙인다
*/

function solution(N, arr) {
  // 0. 사전순 맨 처음 (all 오름차순) 순열일 경우 -1 출력하고 끝
  const lastArr = [...arr].sort((a, b) => a - b);
  if (arr.every((v, i) => v === lastArr[i])) {
    console.log(-1);
    return;
  }

  // 1. 순열 뒤에서부터 볼 때 내림차순이 아닌 숫자가 놓인 index i 를 찾는다
  let i = N - 2;
  while (arr[i] < arr[i + 1]) i--;
  // console.log('idx i', i, 'arr[i]', arr[i]);

  // 2. index i 뒤의 수 중 arr[i] 보다 작은 가장 큰 값이 놓인 index j 를 찾는다
  let j = i + 1;
  let max = 0;
  for (let idx = i + 1; idx < N; idx++) {
    if (arr[i] > arr[idx] && arr[idx] > max) j = idx;
  }
  // console.log('idx j', j, 'arr[j]', arr[j]);

  // 3. arr[i] 와 arr[j] 의 값을 swap 한다
  [arr[i], arr[j]] = [arr[j], arr[i]];
  // console.log(arr);

  // 4. 순열 맨앞부터 arr[i] 까지는 그대로 가져가고,
  //   arr[i+1]부터 순열 맨 마지막까지는 내림차순으로 정리하여 이어 붙인다
  const head = arr.slice(0, i + 1);
  const tail = arr.slice(i + 1).sort((a, b) => b - a);
  const result = [...head, ...tail];

  console.log(result.join(' '));
}

solution(N, arr);
