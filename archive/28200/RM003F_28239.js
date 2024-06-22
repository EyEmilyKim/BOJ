// https://www.acmicpc.net/problem/28239
/*
배고파(Easy)

이 문제는 배고파(Hard)의 하위 문제이고, 배고파(Hard)의 정답 코드를 제출하여 맞힐 수 있다.

송도고등학교는 경관이 참 예쁘다. 도훈이는 특히 학교 뒤쪽에 만개한 벚꽃을 보고 감탄하였다.

남고에서 만개한 벚꽃을 보고 있자니 괜스레 속이 쓰린 도훈이는 밥이나 먹어야겠다고 생각했다. 그런데 도훈이에게는 치료가 필요할 정도로 심각한 결정 장애가 있어서 메뉴를 고르는 것이 쉽지 않다. 따라서 도훈이는 n개의 메뉴를 각각 다음과 같은 규칙으로 골라 먹을 생각이다.

주어진 양의 정수 m에 대해 2^x + 2^y = m인 음이 아닌 정수 x와 y를 찾은 뒤 메뉴판의 (x,y) 위치에 적힌 메뉴를 고른다. 단, x <= y인 경우만 다룬다.

하지만 도훈이는 n과 m이 너무 커서 메뉴를 주문하는 데 어려움을 겪고 있다. 도훈이를 도와 n개의 메뉴를 주문하는 프로그램을 작성하여라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const n = input.shift();
// console.log(n, input);

// 문제 로직 - 브루트 포스

// m 을 구성하는 2**ex 에서 가능한 ex 최대값 구하기 (1 <= m <= 10**18)
const target = 10 ** 18;
let ex = 0;
while (2 ** ex < target) ex++;
// console.log(10 ** 18); // 1000000000000000000
// console.log(2 ** ex);  // 1152921504606847000
// console.log(ex); // 60 => 문제의 조건 충족하려면 y가 60 보다 작아야 함

// x, y 구하기
const result = [];
input.forEach((i) => {
  const m = BigInt(i);
  let found = false; // 반복문 탈출 위한 boolean 변수
  for (let y = 0; y < ex; y++) {
    for (let x = 0; x <= y; x++) {
      if ((BigInt(1) << BigInt(x)) + (BigInt(1) << BigInt(y)) === m) {
        found = true;
        result.push(`${x} ${y}`);
        break;
      }
    }
    if (found) break;
  }
});
console.log(result.join('\n'));

/**
 * 자바스크립트의 Number 타입은 IEEE 754 표준 따르는 64비트 부동 소수점 형식.
 매우 큰 숫자를 다룰 때 정밀도 문제를 겪을 수 있음. 특히, 큰 숫자에서 작은 숫자를 더하거나 빼는 경우, 부동 소수점의 정밀도 한계로 인해 정확도가 떨어질 수 있음.
 => 이를 피하기 위해 BigInt 타입 + 비트 시프트 연산 사용.

 * 비트 시프트 연산 
 : 정수 비트를 왼쪽or오른쪽으로 이동시키는 연산.
 부동 소수점의 정밀도 문제를 피하고 정수 연산을 정확하게 수행함. 
 특히, 2의 거듭제곱 계산할 때 매우 유용.
 예)
const x = 5;
const y = 3;
const result = (1 << x) + (1 << y);
console.log(result); // (2의 x승 = 32) + (2의 y승 = 8) = 40
*/
