// https://www.acmicpc.net/problem/18125
/*
고양이 사료

가톨릭대학교 풀숲 속 집에 살고 있는 고양이 황톨릭은 다른 고양이들에 비해 많이 예민한 고양이이다. 톨릭이네 집에는 어렸을 때부터 전시해왔던 사료 사진이 있는데 톨릭이네 식구들은 학생들이 나눠 준 사료가 사진 속 사료와 동일할 때만 먹는다. 하지만 바람에 의해 사진이 반시계 방향으로 90도 돌아가버린 바람에 톨릭이네 식구들은 사료를 먹지 못하고 있다.

키가 작은 톨릭이네 식구들은 사진을 돌려놓지 못한다. 톨릭이네를 위해 학생들이 나눠준 사료를 구분하여 만약 먹을 수 없다면 놀란 고양이(예제 출력1)를 먹을 수 있다면 윙크하는 고양이(예제 출력2)를 보여주자!

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [R, C] = input.shift().split(' ').map(Number);
// console.log(R, C);
// console.log(input);

// 문제 로직

// 원래 그림 모양 찾기
const turnedPic = input.slice(0, C).map((i) => i.split(' ').map(Number));
// console.log('turnedPic', turnedPic);
const originPic = [];
for (let r = 0; r < R; r++) {
  const row = new Array(R);
  for (let c = 0; c < C; c++) {
    row[C - 1 - c] = turnedPic[c][r];
  }
  originPic.push(row);
}
// console.log('originPic', originPic);

// 사료 놓인 모양 그림과 비교
const food = input.slice(C).map((i) => i.split(' ').map(Number));
// console.log('food', food);
let isSame = true;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (originPic[r][c] !== food[r][c]) {
      isSame = false;
      break;
    }
  }
  if (!isSame) break;
}

// 고양이 출력
const shock = `|>___/|     /}
| O O |    / }
( =0= )""""  \\
| ^  ____    |
|_|_/    ||__|`;

const wink = `|>___/|        /}
| O < |       / }
(==0==)------/ }
| ^  _____    |
|_|_/     ||__|`;

console.log(isSame ? wink : shock);
