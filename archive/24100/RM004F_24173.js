// https://www.acmicpc.net/problem/24173
/*
알고리즘 수업 - 힙 정렬 1

오늘도 서준이는 최소 힙 기반 힙 정렬 수업 조교를 하고 있다. 아빠가 수업한 내용을 학생들이 잘 이해했는지 문제를 통해서 확인해보자.

N개의 서로 다른 양의 정수가 저장된 배열 A가 있다. 힙 정렬로 배열 A를 정렬할 경우 배열 A에 K 번째 교환되는 수를 구해서 우리 서준이를 도와주자.

크기가 N인 배열에 대한 힙 정렬 의사 코드는 다음과 같다.
...


입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [[N, K], nums] = input;
// console.log([N, K], nums);

// 문제 로직
/**
 * 최소 힙 의사 코드 이해하고 구현하는 문제
 * 주의 : 의사 코드에서 root index 가 1인 것을 실제 배열에서는 0으로 처리해야 함.
 */

// 최소 힙 의사 코드 구현
const root = 0; // root 1 => 0
let cnt = 0; // 교환 횟수
let keep = null; // K번째에 교환된 값 2개 배열로 저장
// # A[1..n]을 정렬한다.
function heap_sort(A) {
  const len = N - 1;
  build_min_heap(A, len);
  for (let i = len; i >= root + 1; i--) {
    // root 1 => 0 에 따른 조정
    switchVal(A, 0, i);
    heapify(A, root, i - 1);
  }
}
// # 원소 교환
function switchVal(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
  if (++cnt === K) keep = [arr[a], arr[b]]; // K번째면 교환된 두 값 저장
  // console.log(cnt, nums);
}
function build_min_heap(A, n) {
  for (let i = Math.floor(n / 2); i >= root; i--) {
    heapify(A, i, n);
  }
}

// # A[k]를 루트로 하는 트리를 최소 힙 성질을 만족하도록 수정한다.
// # A[k]의 두 자식을 루트로 하는 서브 트리는 최소 힙 성질을 만족하고 있다.
// # n은 배열 A의 전체 크기이며 최대 인덱스를 나타낸다.
function heapify(A, k, n) {
  const left = k * 2 + 1; // root 1 => 0 에 따른 조정
  const right = k * 2 + 2; // root 1 => 0 에 따른 조정
  let smaller = 0;
  if (right <= n) {
    smaller = A[left] < A[right] ? left : right;
  } else {
    if (left <= n) smaller = left;
    else return;
  }

  // # 최소 힙 성질을 만족하지 못하는 경우 재귀적으로 수정한다.
  if (A[smaller] < A[k]) {
    switchVal(A, k, smaller);
    heapify(A, smaller, n);
  }
}

// 작업 수행
heap_sort(nums);
const result = keep ? keep.sort((a, b) => a - b).join(' ') : -1;
console.log(result);
