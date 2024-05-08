// https://www.acmicpc.net/problem/1546
/*
평균

세준이는 기말고사 점수를 조작해서 집에 가져가기로 했다. 일단 세준이는 자기 점수 중에 최댓값을 골랐다. 이 값을 M이라고 한다. 그리고 나서 모든 점수를 점수/M*100으로 고쳤다.
세준이의 성적을 위의 방법대로 새로 계산했을 때, 새로운 평균을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const origin = input[1].split(' ').map((val) => +val);
// console.log(N, origin);

// 문제 로직

// let max = origin[0];
// for (i = 1; i < origin.length; i++) {
//   if (origin[i] > max) max = origin[i];
// }
const max = Math.max(...origin);
console.log(`max : `, max);

const mdf = origin.map((i) => (i / max) * 100);
console.log(mdf);

// let sum = 0;
// mdf.forEach((i) => (sum += i));
const sum = mdf.reduce((a, b) => a + b);
console.log('sum :', sum);
const avg = sum / mdf.length;
console.log(avg);

/**
 * 배열 함수 활용
 
 * '...' 구문 

 ... 구문은 JavaScript의 확산 연산자(spread operator)로, 배열이나 문자열 같은 iterable 객체를 전개하여 개별 요소로 분리하는 역할을 합니다. 이것은 일반적으로 함수 호출 시 인자로 배열을 사용하거나, 배열을 다른 배열에 추가하거나, 객체를 병합할 때 유용하게 사용됩니다.

 * reduce 함수
 
reduce() 함수는 배열의 각 요소에 대해 주어진 함수를 실행하고 이를 하나의 값으로 축소하는 메서드입니다.

1. 콜백 함수(callback function): 배열의 각 요소에 대해 실행될 함수로, 네 개의 인자를 받습니다.
 - accumulator (누산기): 콜백 함수의 반환 값이 누적되는 곳입니다. 누적기는 각 단계에서 이전 콜백 호출의 반환 값을 유지하며 초기값 또는 이전 호출의 반환 값으로 시작합니다.
 - currentValue (현재 값): 처리 중인 현재 요소입니다.
 - currentIndex (현재 인덱스, 선택사항): 처리 중인 현재 요소의 인덱스입니다.
 - array (원본 배열, 선택사항): reduce()를 호출한 배열입니다.
2. 초기값(initial value, 선택사항): 누적기의 초기값으로 사용됩니다. 지정하지 않으면 배열의 첫 번째 요소가 사용됩니다. 배열이 비어있고 초기값이 제공되지 않으면 TypeError가 발생합니다.

 */
