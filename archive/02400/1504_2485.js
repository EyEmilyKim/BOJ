// https://www.acmicpc.net/problem/2485
/*
가로수

직선으로 되어있는 도로의 한 편에 가로수가 임의의 간격으로 심어져있다. KOI 시에서는 가로수들이 모두 같은 간격이 되도록 가로수를 추가로 심는 사업을 추진하고 있다. KOI 시에서는 예산문제로 가능한 한 가장 적은 수의 나무를 심고 싶다.

편의상 가로수의 위치는 기준점으로 부터 떨어져 있는 거리로 표현되며, 가로수의 위치는 모두 양의 정수이다.

예를 들어, 가로수가 (1, 3, 7, 13)의 위치에 있다면 (5, 9, 11)의 위치에 가로수를 더 심으면 모든 가로수들의 간격이 같게 된다. 또한, 가로수가 (2, 6, 12, 18)에 있다면 (4, 8, 10, 14, 16)에 가로수를 더 심어야 한다.

심어져 있는 가로수의 위치가 주어질 때, 모든 가로수가 같은 간격이 되도록 새로 심어야 하는 가로수의 최소수를 구하는 프로그램을 작성하라. 단, 추가되는 나무는 기존의 나무들 사이에만 심을 수 있다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [N, ...trees] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(N, trees);

// 문제 로직

// 기존 가로수 간 간격의 최대공약수 구하기
let intervals = [];
for (let i = 1; i < N; i++) {
  intervals.push(trees[i] - trees[i - 1]);
}
let intervalGCD = intervals[0];
for (let i = 1; i < N; i++) {
  intervalGCD = getGCD(intervalGCD, intervals[i]);
}

// 목표 간격으로 맞추는데 필요한 나무 개수 구하기
let newPlant = 0;
for (let i = 0; i < N - 1; i++) {
  // 목표 간격과 맞지 않는다면
  if (intervals[i] !== intervalGCD) {
    // 그 사이에 몇개 심을지 계산하여 추가
    newPlant += intervals[i] / intervalGCD - 1;
  }
}

// 결과값 출력
console.log(newPlant);

// 최대공약수 구하는 식
function getGCD(a, b) {
  let [x, y] = [a, b].sort((a, b) => a - b);
  let r;
  while (y) {
    r = x % y;
    x = y;
    y = r;
  }
  return x;
}
