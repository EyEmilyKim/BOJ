// https://www.acmicpc.net/problem/22938
/*
백발백준하는 명사수

백발백준은 무슨 과녁이던 백발백중하여 올림픽 금메달보다 따기 어렵다는 대한민국 양궁 국가대표 타이틀을 가지고 있다. 이런 백발백준이 현재 연마하는 스킬이 있는데...

바로 두 과녁을 한번에 맞추는 스킬이다. 이를 연습하기 위해 두 과녁이 겹치는 부분이 있어 한번에 맞추기가 가능한지 알아보고 싶어졌다.

여러분은 백발백준이 연습하는 과정을 도와주기 위해 원 모양으로 생긴 두 과녁이 겹치는 부분이 존재하는지 확인하는 프로그램을 작성해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[x1, y1, r1], [x2, y2, r2]] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log([x1, y1, r1], [x2, y2, r2]);

// 문제 로직
/**
 * 두 점 사이 거리가 두 원의 반지름 합보다 크거나 같으면 안겹침, 작으면 겹침
 * 두 점 사이 직선거리를 직각 삼각형의 빗변으로 보고, 두 점의 차를 이용해 나머지 두 변을 구한 후 피타고라스 정리 두 점사이 거리 구함.
 * (참고) https://nahwasa.com/entry/%EC%9E%90%EB%B0%94-%EB%B0%B1%EC%A4%80-22938-%EB%B0%B1%EB%B0%9C%EB%B0%B1%EC%A4%80%ED%95%98%EB%8A%94-%EB%AA%85%EC%82%AC%EC%88%98-boj-java
 */

const a = Math.abs(x1 - x2);
const b = Math.abs(y1 - y2);
const x = Math.sqrt(a ** 2 + b ** 2);
// console.log(a, b, x);
console.log(r1 + r2 > x ? 'YES' : 'NO');
