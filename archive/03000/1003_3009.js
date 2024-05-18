// https://www.acmicpc.net/problem/3009
/*
네 번째 점

세 점이 주어졌을 때, 축에 평행한 직사각형을 만들기 위해서 필요한 네 번째 점을 찾는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직

// X좌표 배열, Y좌표 배열 모으기
const X = [];
const Y = [];
input.forEach((i) => {
  const [x, y] = i.split(' ').map((val) => +val);
  X.push(x);
  Y.push(y);
});
// console.log(X);
// console.log(Y);

// 남은 좌표값 찾기
X.sort();
Y.sort();
// console.log(X);
// console.log(Y);

const lastX = X[0] === X[1] ? X[2] : X[0];
const lastY = Y[0] === Y[1] ? Y[2] : Y[0];
console.log(lastX, lastY);
