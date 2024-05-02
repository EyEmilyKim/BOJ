// https://www.acmicpc.net/problem/2884
/*
"45분 일찍 알람 설정하기"

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(' ');
const [H, M] = input.map((val) => +val);
// console.log(H, M);

// 문제 로직
let newH = H;
let newM = M;
if (M < 45) {
  newM = M - 45 + 60;
  newH == 0 ? (newH = 23) : (newH -= 1);
} else {
  newM -= 45;
}
console.log(`${newH} ${newM}`);
