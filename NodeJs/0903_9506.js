// https://www.acmicpc.net/problem/9506
/*
약수들의 합

어떤 숫자 n이 자신을 제외한 모든 약수들의 합과 같으면, 그 수를 완전수라고 한다.

예를 들어 6은 6 = 1 + 2 + 3 으로 완전수이다.

n이 완전수인지 아닌지 판단해주는 프로그램을 작성하라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((val) => +val);
// console.log(input);

//문제 로직
input.pop();
input.forEach((i) => {
  const factors = [];
  let isPerfect = 0;
  for (let n = 0; n < i; n++) {
    if (i % n === 0) factors.push(n);
  }
  if (i === factors.reduce((A, B) => A + B)) isPerfect = 1;
  // console.log(i, factors, isPerfect);
  if (isPerfect) {
    let rightHand = '';
    factors.forEach((i, idx) => {
      if (idx === factors.length - 1) rightHand += i;
      else rightHand += i + ' + ';
    });
    console.log(`${i} = ${rightHand}`);
  } else {
    console.log(`${i} is NOT perfect.`);
  }
});

/**
 * 참고로, 10000 이하의 완전수는 4개 뿐이다 ! 6, 28, 496, 8128

// const input = [];
// for (let i = 6; i < 10000; i++) input.push(i);

  6 = 1 + 2 + 3
  28 = 1 + 2 + 4 + 7 + 14
  496 = 1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248
  8128 = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 127 + 254 + 508 + 1016 + 2032 + 4064
 */
