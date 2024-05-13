// https://www.acmicpc.net/problem/1978
/*
소수 찾기

주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, nums] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, nums);

//문제 로직
let cnt = 0;
nums.split(' ').forEach((i) => {
  const factors = [];
  let isPrime = 0;
  for (let n = 0; n <= i; n++) {
    if (i % n === 0) factors.push(n);
  }
  if (factors.length === 2) {
    isPrime = 1;
    cnt++;
  }
  // console.log(i, factors, cnt);
});
console.log(cnt);
