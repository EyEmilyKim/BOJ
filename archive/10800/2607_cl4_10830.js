// https://www.acmicpc.net/problem/10830
/*
행렬 제곱

크기가 N*N인 행렬 A가 주어진다. 이때, A의 B제곱을 구하는 프로그램을 작성하시오. 수가 매우 커질 수 있으니, A^B의 각 원소를 1,000으로 나눈 나머지를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [[N, B], ...mtrx] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(BigInt));
// console.log(N, B, mtrx);

// 문제 로직
/**
 * 행렬의 곱
- 행렬 A 크기 n*m, 행렬 B 크기 m*r 일 때만 가능 => 결과 행렬 n*r
- 행렬 (AB)ij = 행렬 A의 i행 X 행렬 B의 j열 (자세한 건 아래 링크 참고)
(참고) https://namu.wiki/w/%ED%96%89%EB%A0%AC%EA%B3%B1

 * (X^a * X^b * X^c) = X^(a+b+c) 
=> 지수 분할하여 재귀적으로 곱하기

 * BigInt 
- 정수로 나누면 몫만 취하고 정수형(BigInt) 반환. 소수점은 버려짐
- 문자열로 바꾸면 숫자 형태의 문자열이 됨
- Number 정수형과 산술연산 말고 비교연산은 가능
 */

// 지수 분할하여 제곱 구하기
function power(arr, k) {
  if (k == 1n) {
    return arr.map((r) => r.map((c) => c % 1000n));
  }
  const tmp = power(arr, k / 2n);
  if (k % 2n == 0n) return mulMtrx(tmp, tmp);
  else return mulMtrx(mulMtrx(tmp, tmp), arr);
}

// 행렬 곱하기
function mulMtrx(A, B) {
  const C = switchRtoC(B);
  const result = [];

  for (let i = 0; i < N; i++) {
    result.push([]);
    const a = A[i];
    // console.log('=', i, '=========');

    for (let j = 0; j < N; j++) {
      let sum = 0n;
      // console.log('--', j, '----------');

      const b = C[j];
      // console.log(a);
      // console.log(b);

      for (let k = 0; k < N; k++) {
        sum += a[k] * b[k];
        // console.log(a[k], b[k]);
      }
      result[result.length - 1].push(sum % 1000n);
    }
  }
  return result;
}

// 행렬의 행과 열 바꾸기
function switchRtoC(arr) {
  const n = arr.length;
  const mtrxB = Array.from(Array(n), () => Array(n));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      mtrxB[r][c] = arr[c][r];
    }
  }
  // console.log(mtrxB);
  return mtrxB;
}

// 작업 수행
const result = power(mtrx, B)
  .map((r) => r.join(' '))
  .join('\n');
console.log(result);
