// https://www.acmicpc.net/problem/1037
/*
약수

양수 A가 N의 진짜 약수가 되려면, N이 A의 배수이고, A가 1과 N이 아니어야 한다. 어떤 수 N의 진짜 약수가 모두 주어질 때, N을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[n], [...arr]] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(n, arr);

// 문제 로직
/**
 * 약수 배열은 서로 쌍을 이룬다 ! 
=> N = 정렬된 약수 배열에서 맨 처음 약수와 맨 마지막 약수의 곱
 */
const sortedArr = arr.sort((a, b) => a - b);
const [min, max] = [sortedArr[0], sortedArr[n - 1]];
const result = min * max;
console.log(result);
