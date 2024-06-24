// https://www.acmicpc.net/problem/2630
/*
색종이 만들기

아래 <그림 1>과 같이 여러개의 정사각형칸들로 이루어진 정사각형 모양의 종이가 주어져 있고, 각 정사각형들은 하얀색으로 칠해져 있거나 파란색으로 칠해져 있다. 주어진 종이를 일정한 규칙에 따라 잘라서 다양한 크기를 가진 정사각형 모양의 하얀색 또는 파란색 색종이를 만들려고 한다.
...

전체 종이의 크기가 N×N(N=2k, k는 1 이상 7 이하의 자연수) 이라면 종이를 자르는 규칙은 다음과 같다.

전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 <그림 2>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다. 이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.

위와 같은 규칙에 따라 잘랐을 때 <그림 3>은 <그림 1>의 종이를 처음 나눈 후의 상태를, <그림 4>는 두 번째 나눈 후의 상태를, <그림 5>는 최종적으로 만들어진 다양한 크기의 9장의 하얀색 색종이와 7장의 파란색 색종이를 보여주고 있다.
...

입력으로 주어진 종이의 한 변의 길이 N과 각 정사각형칸의 색(하얀색 또는 파란색)이 주어질 때 잘라진 하얀색 색종이와 파란색 색종이의 개수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직

// 색상 정보 입력
const paper = Array.from(new Array(N + 1), () => new Array(N + 1).fill(-1));
input.forEach((i, idx) => {
  const color = i.split(' ').map(Number);
  for (let i = 1; i <= N; i++) paper[idx + 1][i] = color[i - 1];
});
// console.log(paper.map((row) => row.join(' ')).join('\n'));

// 전역변수 선언
let white = 0; // 흰 색종이 수
let blue = 0; // 파란 색종이 수

// 분할 정복 함수
function checkColor(row, col, size) {
  // console.log('checkColor', row, col, size);
  // 주어진 범위에 색상 섞여있는지 확인
  const color = paper[row][col]; // 기준색 지정
  let isOneColor = true; // 색상 통일 여부
  for (let r = row; r < row + size; r++) {
    for (let c = col; c < col + size; c++) {
      if (paper[r][c] !== color) {
        isOneColor = false;
        break; // 색 하나라도 다르면 통일 아님 -> 다음 단계
      }
    }
    if (!isOneColor) break;
  }
  // 한 색이면 해당 색종이 수 카운트
  if (isOneColor && color === 1) blue++;
  else if (isOneColor && color === 0) white++;
  // 섞였으면 반반 갈라서 다시 확인
  else {
    const newS = size / 2;
    checkColor(row, col, newS); // 영역 1
    checkColor(row, col + newS, newS); // 영역 2
    checkColor(row + newS, col, newS); // 영역 3
    checkColor(row + newS, col + newS, newS); // 영역 4
  }
}

// 작업 수행 및 출력
checkColor(1, 1, N);
console.log(`${white}\n${blue}`);
