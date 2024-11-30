// https://www.acmicpc.net/problem/9663
/*
N-Queen

N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.

N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
/**
 * 퀸 특성 고려해 첫 행 부터 차례차례 가능한 위치에 놓음.
 * 동행, 동열, 대각선 상에 위치하지 않도록 놓는 경우의 수 구하기 => 백트래킹.
 */

function solution(N) {
  const queens = []; // 몇행 몇열에 퀸 놓였는지 저장할 배열
  let cnt = 0;

  // R행 C열에 퀸을 둘 수 있는지 판단하는 함수
  // 이전까지 행 동열 or 대각선에 이미 있으면 out
  function isPossible(R, C) {
    for (let [r, c] of queens) {
      if (r === R || c === C) return false;
      if (Math.abs(r - R) === Math.abs(c - C)) return false;
    }
    return true;
  }

  // 주어진 행부터 차례차례 퀸 놓는 백트래킹 함수
  function dfs(row) {
    if (row === N) {
      cnt++;
      return;
    }
    for (let col = 0; col < N; col++) {
      if (!isPossible(row, col)) continue;
      queens.push([row, col]);
      dfs(row + 1);
      queens.pop();
    }
  }

  // 작업 수행
  dfs(0);
  return cnt;
}

// 결과 출력
console.log(solution(N));
