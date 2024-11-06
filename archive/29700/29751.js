// https://www.acmicpc.net/problem/29751
/*
삼각형

양의 정수 W, H가 주어진다. 밑변의 길이가 W이고, 높이가 H인 삼각형의 넓이를 구하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [W, H] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(W, H);

// 문제 로직
const result = (W * H) / 2;
console.log(result.toFixed(1).toString());
