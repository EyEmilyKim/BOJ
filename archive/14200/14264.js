// https://www.acmicpc.net/problem/14264
/*
정육각형과 삼각형

한 변의 길이가 L인 정육각형을 가지고 있다. 오늘은 이 정육각형에 세 개의 겹치지 않는 대각선을 그리려고 한다.

대각선은 정육각형을 4개의 삼각형으로 나눈다. 4개의 삼각형 중에 면적이 제일 작은 삼각형의 면적을 S라고 한다.

가능한 S중에서 최댓값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
/**
 * 정육각형을 대각선으로 나눠서 제일 작은 삼각형 : 길이 N인 변 두개를 가진 2등변 삼각형. (내각 120 / 30 / 30)
 => 
삼각형의 밑변 : (루트3)*N
높이 : N/2
삼각형의 넓이 : 밑변 * 높이
 * (참고) https://jaimemin.tistory.com/1602
*/

const base = Math.sqrt(3) * N;
const height = N / 2;
const area = (base * height) / 2;
console.log(area);
