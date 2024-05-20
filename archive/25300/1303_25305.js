// https://www.acmicpc.net/problem/25305
/*
커트라인

2022 연세대학교 미래캠퍼스 슬기로운 코딩생활에 N명의 학생들이 응시했다.
이들 중 점수가 가장 높은 k명은 상을 받을 것이다. 
이 때, 상을 받는 커트라인이 몇 점인지 구하라.
커트라인이란 상을 받는 사람들 중 점수가 가장 가장 낮은 사람의 점수를 말한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, k] = input.shift().split(' ').map(Number);
// console.log(N, k, input);

// 문제 로직
const scores = input[0].split(' ').map(Number);
scores.sort((a, b) => b - a);
const cut = scores[k - 1];
console.log(cut);
