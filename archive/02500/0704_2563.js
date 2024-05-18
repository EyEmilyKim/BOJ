// https://www.acmicpc.net/problem/2563
/*
색종이

가로, 세로의 크기가 각각 100인 정사각형 모양의 흰색 도화지가 있다. 이 도화지 위에 가로, 세로의 크기가 각각 10인 정사각형 모양의 검은색 색종이를 색종이의 변과 도화지의 변이 평행하도록 붙인다. 이러한 방식으로 색종이를 한 장 또는 여러 장 붙인 후 색종이가 붙은 검은 영역의 넓이를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const num = +input.shift();
// console.log(num, input);

//문제 로직
// 테이블 준비 (빈 도화지)
const size = 100;
const table = [];
for (let i = 0; i < size; i++) {
  table.push(new Array(size).fill(0));
}

// 테이블 채우기 (색종이 놓기)
for (let n = 0; n < num; n++) {
  const [x, y] = input[n].split(' ').map((val) => +val);
  // console.log(x, y);
  for (let r = y; r < y + 10; r++) {
    for (let c = x; c < x + 10; c++) {
      table[r - 1][c - 1] = 1;
    }
  }
}

// 채워진 칸 세기
let cnt = 0;
for (let i = 0; i < size; i++) {
  // console.log(table[i].join(','));
  for (let j = 0; j < size; j++) {
    if (table[i][j] > 0) cnt++;
  }
}
console.log(cnt);

/**
 * 면의 넓이를 쪼개서 구하는 수학 문제로 생각하지 말고,
 * 도화지와 색종이의 면을 2차원 배열로 치환해서 접근하기 !
 */
