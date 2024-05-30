// https://www.acmicpc.net/problem/2108
/*
통계학

수를 처리하는 것은 통계학에서 상당히 중요한 일이다. 통계학에서 N개의 수를 대표하는 기본 통계값에는 다음과 같은 것들이 있다. 단, N은 홀수라고 가정하자.

1. 산술평균 : N개의 수들의 합을 N으로 나눈 값
2. 중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
3. 최빈값 : N개의 수들 중 가장 많이 나타나는 값
4. 범위 : N개의 수들 중 최댓값과 최솟값의 차이

N개의 수가 주어졌을 때, 네 가지 기본 통계값을 구하는 프로그램을 작성하시오.

입력>
첫째 줄에 수의 개수 N(1 ≤ N ≤ 500,000)이 주어진다. 단, N은 홀수이다. 
그 다음 N개의 줄에는 정수들이 주어진다. 
입력되는 정수의 절댓값은 4,000을 넘지 않는다.

출력>
1. 첫째 줄에는 산술평균을 출력한다. 소수점 이하 첫째 자리에서 반올림한 값을 출력한다.
2. 둘째 줄에는 중앙값을 출력한다.
3. 셋째 줄에는 최빈값을 출력한다. 여러 개 있을 때에는 최빈값 중 두 번째로 작은 값을 출력한다.
4. 넷째 줄에는 범위를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const nums = input.map((i) => +i);
// console.log(N, nums); // 5 [ 1, 3, 8, -2, 2 ]

// 문제 로직

// 1. 산술평균 : N개의 수들의 합을 N으로 나눈 값 / 소수점 이하 첫째 자리에서 반올림
const avg = nums.reduce((a, b) => a + b) / nums.length;
console.log(Math.round(avg) === -0 ? 0 : Math.round(avg));

// 2. 중앙값 : N개(홀수)의 수들을 오름차순 나열했을 경우 그 중앙에 위치하는 값
const sortedNums = nums.sort((a, b) => a - b);
// console.log('sortedNums', sortedNums); // [ -2, 1, 2, 3, 8 ]
const mid = sortedNums[Math.ceil(nums.length / 2) - 1];
console.log(mid);

// 3. 최빈값 : N개의 수들 중 가장 많이 나타나는 값 / 여러 개면 두 번째로 작은 값
// 등장 횟수 딕셔너리
const map = sortedNums.reduce((acc, i) => {
  acc.set(i, (acc.get(i) || 0) + 1);
  return acc;
}, new Map());
// console.log('map', map); // Map(5) { -2 => 1, 1 => 1, 2 => 1, 3 => 1, 8 => 1 }
/** 
 * 일반 객체는 key 를 문자열로 저장하므로 음의 정수 오름차순이 잘 적용되지 않는다.
  // 원배열 [ 1, 3, 8, -2, 2 ]
  // { '1': 1, '2': 1, '3': 1, '8': 1, '-2': 1 } 
 * 이에 비해 Map 객체는 삽입 순서대로 키를 저장하므로 key값 정렬을 유지할 수 있다.
  // Map(5) { -2 => 1, 1 => 1, 2 => 1, 3 => 1, 8 => 1 }
 */
// 최빈값 찾기 (여러개 있다면 오름차순 2번째)
let maxFreq = -1;
let oftenNum = [];
map.forEach((val, key) => {
  if (val > maxFreq) {
    maxFreq = val; // 최대 빈도수 저장
    oftenNum = []; // 배열 리셋
  }
  if (val === maxFreq) oftenNum.push(key); // 빈도수 큰 것만 배열에 추가
});
// console.log('maxFreq', maxFreq);
// console.log('oftenNum', oftenNum);
console.log(oftenNum.length !== 1 ? oftenNum[1] : oftenNum[0]);
/**
 * 왜인지 모르겠지만 위 출력 부분을 아래처럼 했을 때는 틀렸다고 나온다..
  console.log(oftenNum[1] || oftenNum[0]);
  음... 이유는 모르겠지만, 일단 코드는 최대한 안전하고 명확하게 적는게 낫겠군...
 */

// 4. 범위 : N개의 수들 중 최댓값과 최솟값의 차이
const diff = Math.max(...nums) - Math.min(...nums);
console.log(diff);
