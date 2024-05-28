// https://www.acmicpc.net/problem/24723
/*
녹색거탑

녹색거탑은 위 그림과 같이 규칙적으로 쌓여있다.

그림의 시야에 보이지 않는 블록은 없다.
그림의 시야에 보이는 블록의 윗면만 이용해 녹색거탑을 내려올 수 있다.
녹색거탑이 N층이면, 총 N개의 블록을 이용한 최단 경로로만 내려온다.
녹색거탑을 내려올 때는 정상에서 시작해 노란색 바닥까지, 항상 인접한 아래층의 블록으로만 내려온다.

출력>
녹색거탑의 정상에서 바닥으로 내려오는 경우의 수를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
console.log(2 ** input);
