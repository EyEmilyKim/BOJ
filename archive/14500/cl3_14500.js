// https://www.acmicpc.net/problem/14500
/*
테트로미노

폴리오미노란 크기가 1×1인 정사각형을 여러 개 이어서 붙인 도형이며, 다음과 같은 조건을 만족해야 한다.

- 정사각형은 서로 겹치면 안 된다.
- 도형은 모두 연결되어 있어야 한다.
- 정사각형의 변끼리 연결되어 있어야 한다. 즉, 꼭짓점과 꼭짓점만 맞닿아 있으면 안 된다.
정사각형 4개를 이어 붙인 폴리오미노는 테트로미노라고 하며, 다음과 같은 5가지가 있다.
...[]

아름이는 크기가 N×M인 종이 위에 테트로미노 하나를 놓으려고 한다. 종이는 1×1 크기의 칸으로 나누어져 있으며, 각각의 칸에는 정수가 하나 쓰여 있다.

테트로미노 하나를 적절히 놓아서 테트로미노가 놓인 칸에 쓰여 있는 수들의 합을 최대로 하는 프로그램을 작성하시오.

테트로미노는 반드시 한 정사각형이 정확히 하나의 칸을 포함하도록 놓아야 하며, 회전이나 대칭을 시켜도 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
// console.log(N, M, input);

// 문제 로직

// 종이 위 숫자 값 입력
const paper = Array.from(new Array(N + 2), () => new Array(M + 2).fill(0));
for (let r = 1; r <= N; r++) {
  const row = input[r - 1].split(' ');
  for (let c = 1; c <= M; c++) {
    paper[r][c] = +row[c - 1];
  }
}
// console.log(paper.map((r) => r.join(' ')).join('\n'));

// 테트로미노 1개 놨을 때 최대값 구하는 DFS 함수
// prettier-ignore
const maxValue = paper.reduce(
  (acc, row) =>
    Math.max(acc, row.reduce((acc, v) => Math.max(acc, v), 0))
  , 0);
// prettier-ignore
const offset = [[0, 1], [0, -1], [1, 0], [-1, 0],]; // 우, 좌, 상, 하
const visited = Array.from(new Array(N + 2), () => new Array(M + 2).fill(0));
let maxSum = 0;

function DFS(x, y, cnt, sum) {
  // 최대값 가망 없으면 DFS 중지
  if (sum + (4 - cnt) * maxValue <= maxSum) return;

  // 마지막 칸 끝났으면 최대값 갱신하고 종료
  if (cnt === 4) {
    maxSum = Math.max(maxSum, sum);
    return;
  }

  for (const [dx, dy] of offset) {
    const nx = x + dx;
    const ny = y + dy;
    if (paper[nx][ny] && !visited[nx][ny]) {
      // ㅗ,ㅓ,ㅏ,ㅜ 커버를 위한 2번째 칸 분기
      if (cnt === 2) {
        visited[nx][ny] = 1;
        DFS(x, y, cnt + 1, sum + paper[nx][ny]);
        visited[nx][ny] = 0;
      }

      // 그 외 모든 한붓 모양
      visited[nx][ny] = 1;
      DFS(nx, ny, cnt + 1, sum + paper[nx][ny]);
      visited[nx][ny] = 0;
    }
  }
}

// 탐색 실행, 출력
for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= M; c++) {
    visited[r][c] = 1;
    DFS(r, c, 1, paper[r][c]);
    visited[r][c] = 0;
  }
}

console.log(maxSum);

/**
 * 가능한 경우의 수
> 테트로미노(정사각형 4칸짜리 도형)의 모양 종류는 ㅗ,ㅏ,ㅓ,ㅜ 를 제외하고는 
모두 DFS로 4번 탐색해서 나오는 모든 경우(한붓 그리기 가능한 모양)와 같다.
> ㅗ,ㅏ,ㅓ,ㅜ 의 경우, 
DFS 3번 시행 후에 ㅡ,ㅣ,ㄴ,ㄱ ← 이런 모양이 되므로 거기에 이어서는 
DFS 이동 경로 상 ㅗ,ㅏ,ㅓ,ㅜ 모양을 만들 수가 없다.
> 따라서 전체 경우의 수는 
DFS 4번 탐색해서 나오는 모든 경우의 수 + 
ㅗ,ㅏ,ㅓ,ㅜ 인 경우의 수 에 대해 최대값을 구하면 된다.

 * 종이 위 모든 좌표에 대해 DFS 탐색
> 탐색 2번째 마다 
추가 DFS 실행 시 세번째로 이동할 좌표를 탐색처리 한 후 바로 같은 2번째 좌표에서 다시 DFS 실행. 
이렇게 하면 2개의 좌표까지만 탐색한 상태에서 
위,옆,아래 3방향 중 한 곳을 방문 처리 후 또 다른 좌표를 탐색하게 되는데,
한 좌표에서 두 방향으로 갈라지며 탐색하면서 ㅗ,ㅓ,ㅏ,ㅜ 모양을 커버하게 된다.
> 탐색 4번째 끝나면 기존 합의 최대값과 비교하여 갱신.

 * DFS 최적화, 시간 단축
> 미리 종이 위 숫자 중 최대값 구하고, 
매 DFS 마다 남은 탐색할 좌표가 모두 이 최대값이라고 가정할 때 
지금까지의 sum과 더해 maxSum 갱신할 수 있는지 판단하여 DFS 지속/중단.
 */
