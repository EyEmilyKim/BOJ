// https://www.acmicpc.net/problem/29332
/*
보물 지도

오른쪽으로 갈수록 x좌표가 증가하고 위쪽으로 갈수록 y좌표가 증가하는 무한한 좌표평면 위에 살고 있는 여러분은 어느 날 보물 지도를 주웠다. 아쉽게도 여러분이 주운 보물 지도는 여러 개의 조각으로 나뉘어 있어 정확히 어디에 보물이 묻혀 있는지는 알 수 없었다. 그래도 열심히 주어진 지도 조각들을 분석한 결과, 보물이 묻힌 위치에 대해 다음과 같은 정보를 얻을 수 있었다.

보물이 묻혀 있는 위치는 어느 정수 격자점 위이다.
보물이 묻혀 있는 위치를 나타내는 N개의 단서가 있다. 각 단서는 두 정수 x_i, y_i와 문자 d_i로 이루어져 있다. 문자 d_i는 L, R, U, D 중 하나이며, 각각 보물이 (x_i, y_i) 좌표보다 왼쪽, 오른쪽, 위쪽, 아래쪽에 묻혀 있음을 의미한다.
모든 정보는 서로 모순되지 않는다. 즉, 임의의 두 단서를 조합했을 때 가능한 보물의 위치가 존재하지 않는 경우는 없다.
여러분은 모은 단서를 토대로 보물이 있을 수 있는 모든 위치를 탐색해 보려고 한다. 여러분이 탐색해야 할 격자점의 수를 구해보자. 만약 주어진 단서가 불충분해서 탐색해야 할 위치가 무한히 많다면, 대신 Infinity를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
let rightLimit = Infinity;
let leftLimit = -Infinity;
let upLimit = Infinity;
let downLimit = -Infinity;
for (let hint of input) {
  const [strX, strY, d] = hint.split(' ');
  const [x, y] = [Number(strX), Number(strY)];
  if (d === 'L') {
    rightLimit = Math.min(rightLimit, x);
  } else if (d === 'R') {
    leftLimit = Math.max(leftLimit, x);
  } else if (d === 'U') {
    downLimit = Math.max(downLimit, y);
  } else if (d === 'D') {
    upLimit = Math.min(upLimit, y);
  }
}
// console.log(rightLimit, leftLimit, upLimit, downLimit);
let innerPoint = 0;
if (
  upLimit === Infinity ||
  downLimit === -Infinity ||
  rightLimit === Infinity ||
  leftLimit === -Infinity
)
  innerPoint = 'Infinity';
else {
  innerPoint = BigInt(rightLimit - leftLimit - 1) * BigInt(upLimit - downLimit - 1);
}
console.log(String(innerPoint));
