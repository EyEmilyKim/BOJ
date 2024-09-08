// https://www.acmicpc.net/problem/1166
/*
선물

민식이는 아이들에게 선물할 같은 크기의 작은 박스를 N개 가지고 있다. 모든 작은 박스는 정육면체이고, 크기는 A × A × A 이다. 민식이는 이 작은 박스를 크기가 L × W × H 인 직육면체 박스에 모두 넣으려고 한다. 모든 작은 박스는 큰 박스 안에 있어야 하고, 작은 박스의 변은 큰 박스의 변과 평행해야 한다.

N, L, W, H가 주어질 때, 가능한 A의 최댓값을 찾는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, L, W, H] = require('fs').readFileSync(path).toString().trim().split(' ').map(Number);
// console.log(N, [L, W, H]);

// 문제 로직
/**
 * 이분 탐색 으로 A 구하는 문제... 인데 A가 정수 단위가 아님.
=> 보통은 (start = mid +1, end = mid -1) 로 언젠가 start 와 end 가 만나는데,
A가 실수일 때는 start = mid, end = mid 로 소수점 이하 촘촘하게 좁혀가야 하고 
특정 시점에 멈춰주지 않으면 무한루프에 빠짐. 

 * 지수 표기법 1e-9 => 1 * 10^(-9)
여기서 e는 10의 지수승을 의미한다.
함수 호출 없이 상수로 처리되므로, Math.pow(10, -9) 보다 성능 상 유리하다.

 * 이분 탐색 반복 횟수 계산 
문제에서 제시한 최대 A 값은 1,000,000,000 이고 요구하는 정밀도는 10^-9 이다.
따라서 탐색 범위가 1e-9 이하가 될 때까지 이분 탐색(2로 나눔)을 반복해야 한다.
이에 필요한 이분 탐색 최대 반복 횟수 :
n = log_2(초기 탐색 범위/목표 정밀도) => 계산하면 대략 60번.
 */

// 최대 이분 탐색 반복 횟수 구하기
const initialRange = 1e9; // 1,000,000,000
const targetPrecision = 1e-9; // 1 × 10^(-9)
// 로그 계산 함수 : x 가 2의 몇승인지 반환
function log2(x) {
  return Math.log(x) / Math.log(2);
}
const maxIterations = log2(initialRange / targetPrecision);
// console.log(maxIterations); // => 59.794705707972525

// 작은 Box 가 큰 박스에 다 들어갈지 확인하는 함수
function isPossibleSize(a) {
  return Math.floor(L / a) * Math.floor(W / a) * Math.floor(H / a) >= N;
}

// 작은 박스의 한 변 길이 이분 탐색으로 찾아나가는 함수
function binSearchSize(low, high) {
  let [start, end] = [low, high];
  let cnt = 0; // 탐색 반복 횟수

  while (cnt++ < maxIterations && end - start > 1e-9) {
    let mid = (start + end) / 2;
    // console.log('i', cnt, 'start', start, 'end', end, 'mid', mid);
    if (isPossibleSize(mid)) start = mid;
    else end = mid;
  }
  return (start + end) / 2;
}

// 작업 수행
const result = binSearchSize(0, Math.min(L, W, H));
console.log(result.toFixed(9));
