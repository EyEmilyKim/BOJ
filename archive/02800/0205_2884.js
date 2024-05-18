// https://www.acmicpc.net/problem/2884
/*
알람 시계

"45분 일찍 알람 설정하기"
현재 상근이가 설정한 알람 시각이 주어졌을 때, 창영이의 방법을 사용한다면, 이를 언제로 고쳐야 하는지 구하는 프로그램을 작성하시오.

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
