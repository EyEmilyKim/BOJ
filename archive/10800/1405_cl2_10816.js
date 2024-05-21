// https://www.acmicpc.net/problem/10816
/*
숫자 카드 2

숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 몇 개 가지고 있는지 구하는 프로그램을 작성하시오.

입력>
첫째 줄 - 에 상근이가 가지고 있는 숫자 카드의 개수 N (1 ≤ N ≤ 500,000)
둘째 줄 - 숫자 카드에 적혀있는 정수 
            (-10,000,000 <= Ni <= 10,000,000)
셋째 줄 - M (1 ≤ M ≤ 500,000)
넷째 줄 - 상근이가 몇 개 가지고 있는지 구해야 할 M개의 정수. 공백으로 구분.
            (-10,000,000 <= Mi <= 10,000,000)

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
 */

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const cards = input[1].split(' ').map(Number);
const M = +input[2];
const targets = input[3].split(' ').map(Number);
// console.log(N, cards);
// console.log(M, targets);

// 문제 로직 - 방법 1-1 : 딕셔너리 사용... 시간초과
/**
 딕셔너리 작성 위해 이중 반복문으로 배열 이중 순회 => O(N^2)
 아래에 개선된 방법 1-2 (정답) 있음
 */
// 카드더미에 있는 각 수의 갯수 구하기 & 출력
const dic = {};
const cardSet = new Set(cards);
for (let ea of cardSet) {
  let cnt = 0;
  cards.forEach((i) => {
    if (i === ea) cnt++;
    dic[ea] = cnt;
  });
}
// console.log(dic);

// 각각의 숫자 M 가진 갯수 확인
const result = [];
targets.forEach((i) => result.push(dic[i] ? dic[i] : 0));
console.log(result.join(' '));

// 문제 로직 - 방법 1-2 : 딕셔너리 더 빠르게 만들기(reduce()함수, 누산기 사용)
/**
 배열 1회 순회로 각각의 수에 대한 등장횟수를 누산하여 객체{}에 저장 =>O(N)
 */
const acc = cards.reduce((acc, i) => {
  acc[i] = (acc[i] || 0) + 1;
  return acc;
}, {});
// console.log(acc); // { '2': 1, '3': 2, '6': 1, '7': 1, '10': 3, '-10': 2 }

const result1_2 = targets.map((i) => (acc[i] ? acc[i] : 0));
console.log(result1_2.join(' '));

// 문제 로직 - 방법 2: Map 사용
/**
 map 작성 => O(N)
 */

// 검색 대상 배열 1회 순회하며 등장횟수 저장
let map = new Map();
cards.forEach((i) => {
  if (map.has(i)) map.set(i, map.get(i) + 1);
  else map.set(i, 1);
});
// console.log(map);
// Map(6) { 6 => 1, 3 => 2, 2 => 1, 10 => 3, -10 => 2, 7 => 1 }

// 타겟 배열 순회하며 갯수 확인 & 출력
let result2 = [];
targets.forEach((i) => result2.push(map.get(i) || 0));
console.log(result2.join(' '));

// 문제 로직 - 방법 3 : 정렬 후 이진 탐색하며 끝idx-시작idx+1 로 갯수 구하기
/**
정렬에 O(N log N)
 */

// 검색 대상 배열 오름차순 정렬
cards.sort((a, b) => a - b);
// console.log('cards sorted', N, cards);

// 범위 좁혀가며 첫등장, 마지막 등장 idx 찾는 함수
function getLowerIdx(arr, target, start, end) {
  let idx = -1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (target < arr[mid]) end = mid - 1;
    else if (target > arr[mid]) start = mid + 1;
    else {
      idx = mid;
      end = mid - 1; // 그 전에도 있는지 확인
    }
  }
  return idx;
}
function getUpperIdx(arr, target, start, end) {
  let idx = -1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (target < arr[mid]) end = mid - 1;
    else if (target > arr[mid]) start = mid + 1;
    else {
      idx = mid;
      start = mid + 1; // 그 다음에도 있는지 확인
    }
  }
  return idx;
}

// 타겟 배열 순회하며 갯수 확인 & 출력
const result3 = [];
targets.forEach((i) => {
  const start = 0;
  const end = N - 1;
  const lowerIdx = getLowerIdx(cards, i, start, end);
  const upperIdx = getUpperIdx(cards, i, start, end);
  let cnt = 0;
  if (lowerIdx !== -1 && upperIdx !== -1) cnt = upperIdx - lowerIdx + 1;
  result3.push(cnt);
  // console.log(i, cnt);
});
console.log(result3.join(' '));
