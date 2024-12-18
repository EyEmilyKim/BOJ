// https://www.acmicpc.net/problem/16486
/*
운동장 한 바퀴

세연이네 학교 운동장은 아래와 같다.
...


위의 그림에서 영역 A와 B는 반원이며, 영역 C는 직사각형이다. 영역 C의 가로의 길이를 d1, 영역 A의 반지름의 길이 d2의 값이 주어지면 운동장의 한 바퀴 둘레를 알아내는 프로그램을 작성하시오. (단, 이 문제에서는 π (원주율)의 값을 3.141592라고 한다.)

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [w, r] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
// console.log(w, r);

// 문제 로직
/**
 * 원의 둘레 = 2 * pi * r
 */
const pi = 3.141592;
const circle = 2 * pi * r;
const square = 2 * w;
console.log(circle + square);
