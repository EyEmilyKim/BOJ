// https://www.acmicpc.net/problem/14489
/*
치킨 두 마리 (...)

슬프게도, 2017 선린 봄맞이 교내대회의 상품 비용은 욱제의 통장에서 충당된다. 욱제의 마음을 아는지 모르는지, 참가자들이 1등 상품으로 치킨을 무려 두 마리(...)나 달라고 조르고 있다.

욱제에게는 두 개의 통장이 있다. 두 통장의 잔고와 치킨 한 마리의 가격이 주어질 때, 욱제가 치킨 두 마리(...)를 살 수 있는지 알아보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [A, B] = input[0].split(' ').map(Number);
const chicken = +input[1];
// console.log(A, B, chicken);

// 문제 로직
const sum = A + B;
const cost = chicken * 2;
const result = sum >= cost ? sum - cost : sum;
console.log(result);
