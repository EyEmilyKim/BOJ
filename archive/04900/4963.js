// https://www.acmicpc.net/problem/4963
/*
섬의 개수

정사각형으로 이루어져 있는 섬과 바다 지도가 주어진다. 섬의 개수를 세는 프로그램을 작성하시오.


한 정사각형과 가로, 세로 또는 대각선으로 연결되어 있는 사각형은 걸어갈 수 있는 사각형이다. 

두 정사각형이 같은 섬에 있으려면, 한 정사각형에서 다른 정사각형으로 걸어서 갈 수 있는 경로가 있어야 한다. 지도는 바다로 둘러싸여 있으며, 지도 밖으로 나갈 수 없다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직
const result = [];
while (input.length) {
  // 각 테스트 케이스 수행
  const [w, h] = input.shift().split(' ').map(Number); // 필드 사이즈
  if (w === 0 && h === 0) break; // '0 0' 들어오면 종료
  const field = input.splice(0, h).map((r) => r.split(' ').map(Number)); // 지형 데이터

  const visited = Array.from({ length: h }, () => new Array(w).fill(0)); // 방문 체크 배열

  // 이어진 땅 한 섬으로 묶는 dfs 함수
  function dfs(r, c, n) {
    visited[r][c] = n;
    const dir = [
      [-1, 0], // ↑
      [-1, 1], // ↗
      [0, 1], // →
      [1, 1], // ↘
      [1, 0], // ↓
      [1, -1], // ↙
      [0, -1], // ←
      [-1, -1], // ↖
    ];
    // 기점으로부터 8방향으로 뻗으며
    for (const [dr, dc] of dir) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= h || nc < 0 || nc >= w) continue; // 필드 밖은 무효
      if (!visited[nr][nc] && field[nr][nc] === 1) {
        dfs(nr, nc, n); // 이어진 땅 재귀 처리
      }
    }
  }

  // 필드 전체 순회하며 미방문 땅 모두 체크
  let cnt = 0; // 섬 개수 겸 번호
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (!visited[i][j] && field[i][j] == 1) dfs(i, j, ++cnt);
    }
  }
  result.push(cnt);
}

console.log(result.join('\n')); // 최종 결과 출력
