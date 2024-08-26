// https://www.acmicpc.net/problem/21736
/*
헌내기는 친구가 필요해

2020년에 입학한 헌내기 도연이가 있다. 도연이는 비대면 수업 때문에 학교에 가지 못해 학교에 아는 친구가 없었다. 드디어 대면 수업을 하게 된 도연이는 어서 캠퍼스 내의 사람들과 친해지고 싶다. 

도연이가 다니는 대학의 캠퍼스는 
$N \times M$ 크기이며 캠퍼스에서 이동하는 방법은 벽이 아닌 상하좌우로 이동하는 것이다. 예를 들어, 도연이가 (x, y)에 있다면 이동할 수 있는 곳은 (x+1, y), ($, y+1), (x-1, y), (x, y-1)이다. 단, 캠퍼스의 밖으로 이동할 수는 없다.

불쌍한 도연이를 위하여 캠퍼스에서 도연이가 만날 수 있는 사람의 수를 출력하는 프로그램을 작성해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input[0].split(' ').map(Number);
// console.log(N, M, input);

// 문제 로직
/**
 * DFS 그래프 탐색
 */

// 위치 데이터 처리
const campus = Array.from(new Array(N + 2), () => new Array(M + 2).fill('X'));
let startR = 0; // 본인 위치 행 idx
let startC = 0; // 본인 위치 열 idx
for (let r = 1; r <= N; r++) {
  const line = input[r];
  for (let c = 1; c <= M; c++) {
    campus[r][c] = line[c - 1];
    if (line[c - 1] == 'I') {
      startR = r;
      startC = c;
    }
  }
}
// console.log(campus.map((i) => i.join(' ')).join('\n'));

// 캠퍼스 돌며 만난 사람 세는 DFS 함수
const visited = Array.from(Array(N + 2), () => new Array(M + 2).fill(0));
let cnt = 0; // 만난 사람 수
function DFS(n, m) {
  // 현재 탐색 위치 방문 처리
  visited[n][m] = 1;
  // 사람 만났으면 카운트
  if (campus[n][m] == 'P') cnt++;
  // 연결된 영역 이동하며 재귀 탐색
  const shiftN = [0, 0, 1, -1]; // 상하이동 위한 행 idx 조작값
  const shiftM = [1, -1, 0, 0]; // 좌우이동 위한 열 idx 조작값
  for (let i = 0; i < 4; i++) {
    const newN = n + shiftN[i];
    const newM = m + shiftM[i];
    if (campus[newN][newM] !== 'X' && !visited[newN][newM]) {
      DFS(newN, newM);
    }
  }
}

// DFS 실행, 결과 출력
DFS(startR, startC);
console.log(cnt > 0 ? cnt : 'TT');
