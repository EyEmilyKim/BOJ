// https://www.acmicpc.net/problem/2741
/*
N 찍기

자연수 N이 주어졌을 때, 1부터 N까지 한 줄에 하나씩 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
let str = '';
for (let i = 1; i <= input; i++) str += i + '\n';
console.log(str.trim());

/**
 * for 문 안에서 매번 console.log()를 하면 시간 초과가 뜬다.
 */
