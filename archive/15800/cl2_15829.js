// https://www.acmicpc.net/problem/15829
/*
Hashing

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const L = +input[0];
const str = input[1];
// console.log(L, str);

// 문제 로직

// 문자열을 숫자열로 변환
// console.log('a'.charCodeAt(0)); // 97
// console.log('z'.charCodeAt(0)); // 122
const numArr = str.split('').map((i) => BigInt(i.charCodeAt(0) - 96));
// console.log(numArr);

// 해싱 처리
const r = 31n;
const M = 1234567891n;
let sigma = 0n;
numArr.forEach((i, idx) => {
  const BigIdx = BigInt(idx);
  sigma += i * r ** BigIdx;
});

// 출력
console.log(String(sigma % M));

/**
 * 부분정답이 있는 문제로 
 일반 숫자인 Number 형으로 제출하면 Large 파트를 통과하지 못해 50점만 받는다.
 r 을 거듭제곱 하면서 오버플로우가 발생하기 때문.
 100점을 받기 위해서는 BigInt 형을 사용해야 한다.

 * 오버플로우(Overflow) : 컴퓨터 과학에서 흔히 발생하는 현상 중 하나.데이터가 변수나 데이터 구조의 허용된 범위를 벗어나는 경우에 발생하며, 주로 숫자가 표현할 수 있는 최대 값보다 큰 값을 저장하려고 할 때 발생.

 예를 들어, 정수로 표현할 수 있는 범위가 0부터 255까지인 경우, 255에 1을 더하면 오버플로우가 발생하여 결과는 0이 된다. 
 이러한 오버플로우는 프로그램의 예기치 않은 동작을 유발할 수 있으며, 때로는 보안 문제의 근본이 될 수도 있다.

 * BigInt은 JavaScript에 도입된 새로운 숫자 형식 중 하나입니다. 이는 기존의 Number 형식보다 더 큰 정수 값을 표현할 수 있습니다.

 BigInt는 다음과 같은 방법으로 생성됩니다:
 const bigIntNum = 1234567890123456789012345678901234567890n;
 숫자 뒤에 'n'을 붙이면 JavaScript 엔진은 해당 값이 BigInt임을 인식하고, Number 형식이 아닌 BigInt 형식으로 처리합니다.

 BigInt와 Number 간의 연산은 대부분의 경우 허용되지 않는다. 이를 해결하기 위해서는 Number를 BigInt로 변환해야 합니다.

 const regularNumber = 123; // 일반 숫자
 const bigIntNumber = BigInt(regularNumber); // BigInt로 변환
 console.log(bigIntNumber); // 출력: 123n

 */
