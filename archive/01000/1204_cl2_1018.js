// https://www.acmicpc.net/problem/1018
/*
체스판 다시 칠하기

지민이는 자신의 저택에서 MN개의 단위 정사각형으로 나누어져 있는 M×N 크기의 보드를 찾았다. 어떤 정사각형은 검은색으로 칠해져 있고, 나머지는 흰색으로 칠해져 있다. 지민이는 이 보드를 잘라서 8×8 크기의 체스판으로 만들려고 한다.

보드가 체스판처럼 칠해져 있다는 보장이 없어서, 지민이는 8×8 크기의 체스판으로 잘라낸 후에 몇 개의 정사각형을 다시 칠해야겠다고 생각했다. 당연히 8*8 크기는 아무데서나 골라도 된다. 지민이가 다시 칠해야 하는 정사각형의 최소 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
// console.log(N, M, input);

// 문제 로직

// 8*8 흰색 / 검정으로 시작하는 체스판
const whiteFirst = [
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
];
const blackFirst = [
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
  'BWBWBWBW',
  'WBWBWBWB',
];

// 흰색시작, 검정시작 체스판과 색이 다른 칸 수 확인하는 메서드
function checkWhite(r, c) {
  let cnt = 0;
  for (let i = r; i < r + 8; i++) {
    for (let j = c; j < c + 8; j++) {
      if (input[i][j] !== whiteFirst[i - r][j - c]) cnt++;
    }
  }
  return cnt;
}
function checkBlack(r, c) {
  let cnt = 0;
  for (let i = r; i < r + 8; i++) {
    for (let j = c; j < c + 8; j++) {
      if (input[i][j] !== blackFirst[i - r][j - c]) cnt++;
    }
  }
  return cnt;
}

// 자리 옮겨가며 색이 다른 칸 수 확인하기
const repaint = [];
for (let n = 0; n + 8 <= N; n++) {
  for (let m = 0; m + 8 <= M; m++) {
    repaint.push(checkWhite(n, m));
    repaint.push(checkBlack(n, m));
  }
}

// 최소값 출력
console.log(Math.min(...repaint));
