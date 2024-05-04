// https://www.acmicpc.net/problem/1008
/*
두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const input = require('fs').readFileSync('example.txt').toString().split(' ');
const A = +input[0];
const B = +input[1];

// 문제 로직
console.log(A / B);

/**
 * 
Number() 또는 parseInt() 대신에 + 연산자 사용해도 암시적으로 정수로 바꿔준다
 * 
JavaScript에서 Number()와 parseInt() 함수는 숫자로 변환하는 데 사용됩니다. 그러나 두 함수 간에는 몇 가지 중요한 차이점이 있습니다.

Number() 함수: 이 함수는 전달된 값의 숫자 표현을 반환합니다. 이 값이 숫자가 아니면, JavaScript는 가능한 경우 숫자로 변환하려고 시도합니다. 이에 따라 Number() 함수는 문자열을 숫자로 변환할 때 문자열 내의 숫자가 아닌 문자를 무시하고 변환합니다. 
예를 들어, Number("123abc")는 123을 반환합니다.

parseInt() 함수: 이 함수는 문자열을 해석하여 정수를 반환합니다. 문자열을 숫자로 변환하는 동안, parseInt()는 첫 번째로 발견된 숫자를 기준으로 변환을 수행합니다. 따라서 parseInt("123abc")는 123을 반환합니다. 또한 parseInt() 함수는 두 번째 인수로 진수(radix)를 지정할 수 있습니다. 이는 해당 문자열이 몇 진수로 표현되었는지를 나타내며, 기본값은 10입니다(10진수).
 */
