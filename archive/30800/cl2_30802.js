// https://www.acmicpc.net/problem/30802
/*
웰컴 키트

2024년 2월 3일 개최 예정인 온사이트 그랜드 아레나에서는 참가자들에게 티셔츠 한 장과 펜 한 자루가 포함된 웰컴 키트를 나눠줄 예정입니다. 키트를 제작하는 업체는 다음과 같은 조건으로만 주문이 가능합니다.

티셔츠는 S, M, L, XL, XXL, 그리고 XXXL의 6가지 사이즈가 있습니다. 티셔츠는 같은 사이즈의 T장 묶음으로만 주문할 수 있습니다.
펜은 한 종류로, P자루씩 묶음으로 주문하거나 한 자루씩 주문할 수 있습니다.
총 N명의 참가자 중 S, M, L, XL, XXL, XXXL 사이즈의 티셔츠를 신청한 사람은 각각 S, M, L, XL, XXL, XXXL명입니다. 티셔츠는 남아도 되지만 부족해서는 안 되고 신청한 사이즈대로 나눠주어야 합니다. 펜은 남거나 부족해서는 안 되고 정확히 참가자 수만큼 준비되어야 합니다.

티셔츠를 T장씩 최소 몇 묶음 주문해야 하는지, 그리고 펜을 P자루씩 최대 몇 묶음 주문할 수 있고, 그 때 펜을 한 자루씩 몇 개 주문하는지 구하세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const sizeQ = input[1].split(' ').map(Number);
const [T, P] = input[2].split(' ').map(Number);
// console.log(N, sizeQ, T, P);

// 문제 로직

// T셔츠 묶음 수 구하기
let bundleT = 0;
sizeQ.forEach((i) => {
  let total = 0;
  while (total < i) {
    bundleT++;
    total += T;
  }
});
console.log(bundleT);

// 펜 묶음 & 낱개 수 구하기
let bundleP = 0;
let eaP = N;
while (eaP >= P) {
  bundleP++;
  eaP -= P;
}
console.log(`${bundleP} ${eaP}`);
