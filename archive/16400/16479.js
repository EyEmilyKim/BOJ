// https://www.acmicpc.net/problem/16479
/*
컵라면 측정하기

컵라면은 두 개의 밑면이 서로 평행하며, 원 모양인 원뿔대이다. 따라서 컵라면을 옆에서 본 모습은 아래 그림과 같은 등변사다리꼴이다.
...


위 등변사다리꼴에서 민수가 측정한 컵라면의 윗면의 지름은 D1, 아랫면의 지름은 D2이다. 민수가 아직 측정하지 않은 변의 길이는 K이다. 이때, (컵라면의 높이)2의 값을 알아내는 프로그램을 작성하시오. (단, 컵라면의 높이는 등변사다리꼴에서 평행한 두 변 사이의 거리로 정의한다.)

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[k], [d1, d2]] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(k, [d1, d2]);

// 문제 로직
const s1 = (d1 - d2) / 2;
const h = Math.sqrt(k ** 2 - s1 ** 2);
console.log(h ** 2);
