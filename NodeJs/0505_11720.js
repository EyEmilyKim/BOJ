// https://www.acmicpc.net/problem/11720
/*
숫자의 합

N개의 숫자가 공백 없이 쓰여있다. 이 숫자를 모두 합해서 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const n = +input[0];
const nums = input[1];
// console.log(n, nums);

//문제 로직

// let sum = 0;
// for (i = 0; i < nums.length; i++) sum += Number(nums[i]);
// console.log(sum);

const numsArr = input[1].split('').map((val) => +val);
const sum = numsArr.reduce((a, b) => a + b);
console.log(sum);

/**
 * 정수를 문자열로 입력받는 문제. Python처럼 정수 크기에 제한이 없다면 상관 없으나, 예제 3은 일반적인 정수 자료형에 담기에 너무 크다는 점에 주목합시다.
 */
