// https://www.acmicpc.net/problem/1271
/*
엄청난 부자2

갑부 최백준 조교는 동전을 최소로 바꾸는데 성공했으나 김재홍 조교가 그 돈을 발견해서 최백준 조교에게 그 돈을 나누자고 따진다.

그 사실이 전 우주로 알려지자 우주에 있던 많은 생명체들이 자신들에게 돈을 분배해 달라고 당장 달려오기 시작했다.

프로토스 중앙 우주 정부의 정책인, ‘모든 지적 생명체는 동등하다’라는 규칙에 입각해서 돈을 똑같이 분배하고자 한다.

한 생명체에게 얼마씩 돈을 줄 수 있는가?

또, 생명체들에게 동일하게 분배한 후 남는 돈은 얼마인가?

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [n, m] = require('fs').readFileSync(path).toString().trim().split(' ').map(BigInt);
// console.log(n, m);

// 문제 로직
const slice = n / m;
const r = n % m;
console.log(`${slice}\n${r}`);
