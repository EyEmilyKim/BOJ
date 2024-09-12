// https://www.acmicpc.net/problem/10026
/*
적록색약

적록색약은 빨간색과 초록색의 차이를 거의 느끼지 못한다. 따라서, 적록색약인 사람이 보는 그림은 아닌 사람이 보는 그림과는 좀 다를 수 있다.

크기가 N×N인 그리드의 각 칸에 R(빨강), G(초록), B(파랑) 중 하나를 색칠한 그림이 있다. 그림은 몇 개의 구역으로 나뉘어져 있는데, 구역은 같은 색으로 이루어져 있다. 또, 같은 색상이 상하좌우로 인접해 있는 경우에 두 글자는 같은 구역에 속한다. (색상의 차이를 거의 느끼지 못하는 경우도 같은 색상이라 한다)

예를 들어, 그림이 아래와 같은 경우에

RRRBB
GGBBB
BBBRR
BBRRR
RRRRR
적록색약이 아닌 사람이 봤을 때 구역의 수는 총 4개이다. (빨강 2, 파랑 1, 초록 1) 하지만, 적록색약인 사람은 구역을 3개 볼 수 있다. (빨강-초록 2, 파랑 1)

그림이 입력으로 주어졌을 때, 적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const normalSite = input.map((i) => i.split(''));
// console.log(N, normalSite);

// 문제 로직
/**
 * DFS 깊이 우선 탐색
 * 주어지는 배열이 한가지가 아닐 때의 함수 설계
 */

// 적녹색약자가 보는 그림 & 녹색이 포함됐는지 구하기
let includeG = false;
const weakSite = normalSite.map((row) =>
  row.map((cell) => {
    if (cell === 'G') {
      includeG = true;
      return (cell = 'R');
    } else return cell;
  })
);
// console.log(includeG, weakSite);

// 주어진 배열에 대해 색상 구역 수 구하는 함수
function getSectionCnt(arr) {
  // 내부 DFS 함수
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));
  function dfs(r, c, color) {
    if (r < 0 || c < 0 || r >= N || c >= N) return;
    if (arr[r][c] === color && !visited[r][c]) {
      visited[r][c] = true;
      for (let d of [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
      ]) {
        dfs(r + d[0], c + d[1], color);
      }
    }
  }
  // 전체 배열 DFS 탐색하며 구역 수 계산 후 반환
  let cnt = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (!visited[r][c]) {
        cnt++;
        color = arr[r][c];
        // console.log('r', r, 'c', c, 'color:', color, 'cnt:', cnt);
        dfs(r, c, color);
      }
    }
  }
  // console.log('---');
  return cnt;
}

// 작업 수행
const normalCnt = getSectionCnt(normalSite);
const weakCnt = includeG ? getSectionCnt(weakSite) : normalCnt;
console.log(`${normalCnt} ${weakCnt}`);
