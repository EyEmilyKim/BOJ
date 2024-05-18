// https://www.acmicpc.net/problem/19532
/*
수학은 비대면강의입니다

다음 연립방정식에서 x 와 ㅛ 의 값을 계산하시오.
ax + by = c
dx + ey = f

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [a, b, c, d, e, f] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((i) => +i);
console.log(a, b, c, d, e, f);

// 문제 로직 - 방법 1 : 완전탐색
for (let x = -999; x <= 999; x++) {
  for (let y = -999; y <= 999; y++) {
    if (a * x + b * y === c && d * x + e * y === f) console.log(`${x} ${y}`);
  }
}

// 문제 로직 - 방법 2 : 연립방정식을 이용한 풀이
let x = 0;
let y = 0;
if (a == 0) {
  x = (b * f - c * e) / (b * d);
  y = c / b;
} else if (b == 0) {
  x = c / a;
  y = (a * f - c * d) / (a * e);
} else if (d == 0) {
  x = (c * e - b * f) / (a * e);
  y = f / e;
} else if (e == 0) {
  x = f / d;
  y = (c * d - a * f) / (b * d);
} else {
  x = (c * e - b * f) / (a * e - b * d);
  y = (c * d - a * f) / (b * d - a * e);
}
console.log(x + ' ' + y);

/**
 * 연립 방정식 각각의 식에 x 또는 y 의 계수를 통일하기 위해 다른 하나의 계수를 전체 항에 곱하고, 미지수를 2개 가진 식에서 1개만 남은 식을 뺄셈하여 하나의 미지수만 남긴 뒤 정리.
 
 * a,b,d,e 각각이 0이 었을 때 그것을 계수로 갖는 항의 값은 0 이지만, 그것이 곧 x 또는 y 가 0 임을 뜻하지는 않는다.
 따라서 a,b,d,e 가 0일 때의 경우를 따로 정리해줘야 함.
 */
