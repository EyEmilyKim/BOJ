// https://www.acmicpc.net/problem/1987
/*
알파벳

세로 R칸, 가로 C칸으로 된 표 모양의 보드가 있다. 보드의 각 칸에는 대문자 알파벳이 하나씩 적혀 있고, 좌측 상단 칸 (1행 1열) 에는 말이 놓여 있다.

말은 상하좌우로 인접한 네 칸 중의 한 칸으로 이동할 수 있는데, 새로 이동한 칸에 적혀 있는 알파벳은 지금까지 지나온 모든 칸에 적혀 있는 알파벳과는 달라야 한다. 즉, 같은 알파벳이 적힌 칸을 두 번 지날 수 없다.

좌측 상단에서 시작해서, 말이 최대한 몇 칸을 지날 수 있는지를 구하는 프로그램을 작성하시오. 말이 지나는 칸은 좌측 상단의 칸도 포함된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [nums, ...board] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [R, C] = nums.split(' ').map(Number);
// console.log(R, C, board);

// 문제 로직
/**
 * DFS, 백트래킹
 */
const visited = new Array(26).fill(false); // 알파벳 별 방문 여부
let ans = 0;
let dir = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];
function dfs(r, c, cnt) {
  ans = Math.max(ans, cnt);
  for (const [dr, dc] of dir) {
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nc < 0 || nr >= R || nc >= C) continue;
    if (!visited[board[nr][nc].charCodeAt() - 65]) {
      visited[board[nr][nc].charCodeAt() - 65] = true;
      dfs(nr, nc, cnt + 1);
      visited[board[nr][nc].charCodeAt() - 65] = false;
    }
  }
}

visited[board[0][0].charCodeAt() - 65] = true;
dfs(0, 0, 1);
console.log(ans);
