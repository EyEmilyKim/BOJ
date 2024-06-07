// https://www.acmicpc.net/problem/17087
/*
숨바꼭질 6

수빈이는 동생 N명과 숨바꼭질을 하고 있다. 수빈이는 현재 점 S에 있고, 동생은 A1, A2, ..., AN에 있다.
수빈이는 걸어서 이동을 할 수 있다. 수빈이의 위치가 X일때 걷는다면 1초 후에 X+D나 X-D로 이동할 수 있다. 수빈이의 위치가 동생이 있는 위치와 같으면, 동생을 찾았다고 한다.
모든 동생을 찾기위해 D의 값을 정하려고 한다. 가능한 D의 최댓값을 구해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, S] = input[0].split(' ').map(Number);
const target = input[1].split(' ').map(Number);
// console.log(N, S, target);

// 문제 로직
/**
 * 수빈이는 거리 D 단위로만 움직일 수 있다
 * => 모든 동생을 찾기 위한 D 값 : 수빈이와 동생들 간의 간격의 최대공약수
 */

// 최대공약수 구하는 함수 - 유클리드 호제법
function getGCD(a, b) {
  if (a % b === 0) return b;
  else return getGCD(b, a % b);
}

// 작업 수행
let result = 0;
if (target.length === 1) {
  // 동생이 한 명일 때는 수빈이와 그 동생의 거리
  result = Math.abs(S - target[0]);
} else {
  // 여러명일 때는 각 거리 최대공약수
  let idx = 0;
  let tmpGCD = 0;
  const distance = target.map((i) => Math.abs(i - S)); // 수빈이와 각 동생들과의 거리
  // console.log(distance);
  while (idx < N - 1) {
    if (idx === 0) tmpGCD = getGCD(distance[idx], distance[++idx]);
    else tmpGCD = getGCD(tmpGCD, distance[++idx]);
  }
  result = tmpGCD;
}
console.log(result);
