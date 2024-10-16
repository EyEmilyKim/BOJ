// https://www.acmicpc.net/problem/4948
/*
베르트랑 공준

베르트랑 공준은 임의의 자연수 n에 대하여, n보다 크고, 2n보다 작거나 같은 소수는 적어도 하나 존재한다는 내용을 담고 있다.

이 명제는 조제프 베르트랑이 1845년에 추측했고, 파프누티 체비쇼프가 1850년에 증명했다.

예를 들어, 10보다 크고, 20보다 작거나 같은 소수는 4개가 있다. (11, 13, 17, 19) 또, 14보다 크고, 28보다 작거나 같은 소수는 3개가 있다. (17,19, 23)

자연수 n이 주어졌을 때, n보다 크고, 2n보다 작거나 같은 소수의 개수를 구하는 프로그램을 작성하시오. 

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
input.pop();
// console.log(input);

// 문제 로직
const result = [];

// 모든 테스트 케이스에 대하여
for (let n of input) {
  // 2n 이하 소수 구하기 - 에라토스테네스의 체
  let isPrimeNum = new Array(n * 2 + 1).fill(true);
  isPrimeNum[0] = isPrimeNum[1] = false;

  for (let i = 2; i <= Math.ceil(Math.sqrt(n * 2)); i++) {
    if (!isPrimeNum[i]) continue;

    for (let j = i * 2; j <= n * 2; j += i) {
      isPrimeNum[j] = false;
    }
  }

  // n 초과 2n 이하의 소수 개수 구하기
  let cnt = 0;
  for (let i = n + 1; i <= n * 2; i++) {
    if (isPrimeNum[i]) cnt++;
  }
  result.push(cnt); // 결과 저장
}

// 결과 출력
console.log(result.join('\n'));
