// https://www.acmicpc.net/problem/10872
/*
팩토리얼

0보다 크거나 같은 정수 N이 주어진다. 이때, N!을 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
let factorial = 1;
for (let i = 1; i <= input; i++) factorial *= i;
console.log(factorial);

/**
 * 0의 팩토리얼은 1이다 !
 3! = 3*2!
 2! = 2*1!
 1! = 1* (1-1)! 이 성립하려면 0! = 1 이어야 한다.
 */
