// https://www.acmicpc.net/problem/2580
/*
스도쿠

스도쿠는 18세기 스위스 수학자가 만든 '라틴 사각형'이랑 퍼즐에서 유래한 것으로 현재 많은 인기를 누리고 있다. 이 게임은 아래 그림과 같이 가로, 세로 각각 9개씩 총 81개의 작은 칸으로 이루어진 정사각형 판 위에서 이뤄지는데, 게임 시작 전 일부 칸에는 1부터 9까지의 숫자 중 하나가 쓰여 있다.
...


나머지 빈 칸을 채우는 방식은 다음과 같다.

각각의 가로줄과 세로줄에는 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
굵은 선으로 구분되어 있는 3x3 정사각형 안에도 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
위의 예의 경우, 첫째 줄에는 1을 제외한 나머지 2부터 9까지의 숫자들이 이미 나타나 있으므로 첫째 줄 빈칸에는 1이 들어가야 한다.
...


또한 위쪽 가운데 위치한 3x3 정사각형의 경우에는 3을 제외한 나머지 숫자들이 이미 쓰여있으므로 가운데 빈 칸에는 3이 들어가야 한다.
...


이와 같이 빈 칸을 차례로 채워 가면 다음과 같은 최종 결과를 얻을 수 있다.
...


게임 시작 전 스도쿠 판에 쓰여 있는 숫자들의 정보가 주어질 때 모든 빈 칸이 채워진 최종 모습을 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(input);

// 문제 로직
/**
 * 백트래킹, DFS
1. 모든 0 위치 배열에 저장
2. 하나씩 꺼내며 DFS로 값 찾아넣기
3. 모든 0 에 값이 채워지면 출력 후 종료
 */

// 모든 0 위치 담기
let zero = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (input[i][j] == 0) zero.push([i, j]);
  }
}

// 가능한 후보 숫자 넣어보며 모든 0 값 찾아가는 DFS 함수
function dfs(idx) {
  if (idx === zero.length) {
    // 모든 0 값 구해지면
    console.log(input.map((r) => r.join(' ')).join('\n')); // 결과 출력
    process.exit(); // 프로세스 수동 종료
  }

  const [r, c] = [zero[idx][0], zero[idx][1]];

  for (let i = 1; i <= 9; i++) {
    // 후보 숫자 i 가능한지 확인
    if (isOkSoFar(r, c, i)) {
      input[r][c] = i; // 0를 i로 변경
      dfs(idx + 1); // 다음 0 찾아서 넣기
      input[r][c] = 0; // 넣어놨던 i 다시 0으로
    }
  }
}

// 조건 충족 여부 판단하는 함수
function isOkSoFar(r, c, v) {
  // 가로 세로 확인
  for (let i = 0; i < 9; i++) {
    if (input[r][i] === v || input[i][c] === v) return false;
  }
  // 3 * 3 블록 내 확인
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let i = br; i < br + 3; i++) {
    for (let j = bc; j < bc + 3; j++) {
      if (input[i][j] === v) return false;
    }
  }
  return true;
}

// 작업 수행
dfs(0);
