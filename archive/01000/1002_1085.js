// https://www.acmicpc.net/problem/1085
/*
직사각형에서 탈출

한수는 지금 (x, y)에 있다. 직사각형은 각 변이 좌표축에 평행하고, 왼쪽 아래 꼭짓점은 (0, 0), 오른쪽 위 꼭짓점은 (w, h)에 있다. 직사각형의 경계선까지 가는 거리의 최솟값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [x, y, w, h] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(' ')
  .map((val) => +val);
// console.log(x, y, w, h);

// 문제 로직
const diffX = Math.abs(w - x);
const diffY = Math.abs(h - y);
const diff0X = Math.abs(x - 0);
const diff0Y = Math.abs(y - 0);
const min = Math.min(diffX, diffY, diff0X, diff0Y);
console.log(min);

/**
 * Math.abs() : 절대값 반환
 
 * [대각선 구하는 문제라면]
 * 피타고라스 정리에 의해
 직사각형의 대각선은 직각 삼각형 빗변의 길이와 같다
 l^2 = a^2+b^2 -> l = 루트(a제곱 + b제곱)
  
 * Math.pow() : 거듭제곱 값 계산
 예) Math.pow(2,3) = 2의 3승 = 8
 
 * Math.sqrt() : 제곱근 계산
 예) Math.sqrt(25) = 5
 예) Math.sqrt(1024) = 32
 */
