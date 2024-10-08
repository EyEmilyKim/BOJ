// https://www.acmicpc.net/problem/2110
/*
공유기 설치

도현이의 집 N개가 수직선 위에 있다. 각각의 집의 좌표는 x1, ..., xN이고, 집 여러개가 같은 좌표를 가지는 일은 없다.

도현이는 언제 어디서나 와이파이를 즐기기 위해서 집에 공유기 C개를 설치하려고 한다. 최대한 많은 곳에서 와이파이를 사용하려고 하기 때문에, 한 집에는 공유기를 하나만 설치할 수 있고, 가장 인접한 두 공유기 사이의 거리를 가능한 크게 하여 설치하려고 한다.

C개의 공유기를 N개의 집에 적당히 설치해서, 가장 인접한 두 공유기 사이의 거리를 최대로 하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, C] = input.shift().split(' ').map(Number);
const houses = input.map(Number).sort((a, b) => a - b);
// console.log(N, C, houses);

// 문제 로직
/**
 * 이분 탐색 
=> 인접한 두 공유기 사이 거리 변경해가면서 C개의 공유기 모두 설치할 수 있는 최대의 거리 찾기
 */

function solution(N, C) {
  // 주어진 거리로 모든 집 설치 가능한지 확인하는 함수
  function isPossible(distance) {
    let cnt = C - 1;
    let prev = houses[0];
    for (let i = 1; i < N; i++) {
      if (houses[i] - prev >= distance) {
        cnt--;
        prev = houses[i];
      }
    }
    return cnt <= 0;
  }

  // 이분 탐색으로 적정 거리 찾기
  let low = 1;
  let high = houses[N - 1];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (isPossible(mid)) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  // 최대 거리 반환
  return high;
}

const result = solution(N, C);
console.log(result);
