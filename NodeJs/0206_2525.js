// https://www.acmicpc.net/problem/2525
/*
훈제오리구이를 시작하는 시각과 오븐구이를 하는 데 필요한 시간이 분단위로 주어졌을 때, 오븐구이가 끝나는 시각을 계산하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split('\n');
const [H, M] = input[0].split(' ').map((val) => +val);
const t = +input[1];
console.log(input);
console.log(H, M, t);

// 문제 로직
const fin = H * 60 + M + t;
let finH = Math.floor(fin / 60);
const finM = fin % 60;
if (finH >= 24) finH -= 24;
console.log(finH + ' ' + finM);

/**
 아래처럼 짜도 입출력 결과는 같은데 틀렸다고 나온다.. 왤까...ㅠ
 
// 문제 로직
const rH = Math.floor(t / 60);
const rM = t % 60;
// console.log('rH rM : ', rH, rM);

let finH = H + rH;
let finM = M + rM;
if (finM >= 60) {
  finM -= 60;
  finH == 23 ? (finH = 0) : (finH += 1);
}
console.log(finH + ' ' + finM);
 
 */
