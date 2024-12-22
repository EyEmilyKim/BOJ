// https://www.acmicpc.net/problem/16483
/*
접시 안의 원

접시는 아래의 그림과 같이 중심이 같은 두 원이 겹쳐져 있는 형태이다.
...


여기에서 작은 원의 접선이 큰 원과 만나는 두 점 사이의 거리를 T, 작은 원의 반지름을 b, 큰 원의 반지름을 a라고 한다. T의 값이 주어지면, a2-b2의 값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const T = +require('fs').readFileSync(path).toString().trim();
// console.log(T);

// 문제 로직
/**
 * 피타고라스 정리
 * 선분 T 의 절반(s)을 밑변으로, 작은 원 반지름 b와 큰 원 반지름 a를 변으로 갖는 직각삼각형
 * s^2 + b^2 = a^2
 * => s^2 = a^2 - b^2
 */

const s = (T / 2) ** 2;
console.log(s.toFixed(0));
