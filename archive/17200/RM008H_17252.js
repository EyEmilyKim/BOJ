// https://www.acmicpc.net/problem/17252
/*
삼삼한 수

준하는 3의 거듭제곱인 수만 사용하여 만들 수 있는 수를 보면 삼삼한 느낌을 받는다.

이 느낌을 정확히 설명하자면, 3의 거듭제곱인 수들을 겹치지 않고 한번씩만 더해서 어떤 수 x를 만들 수 있다면 그 수는 삼삼하다고 한다. 삼삼한 수는 3의 거듭제곱인 수가 반드시 하나 이상 포함되어야 한다.

예를 들어, 109는 30+33+34로 나타낼 수 있으므로 삼삼한 수이다. 하지만 7과 18은 삼삼하지 않다.

준하는 삼삼한 수가 얼마나 더 있는 지 알아보려고 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = +require('fs').readFileSync(path).toString().trim();
// console.log(input);

// 문제 로직
/**
 * 수 X 를 3진수로 변환해서,
 각 자리 수가 0 또는 1 이면 YES (안쓰거나, 한번 쓰거나)
 하나라도 2가 있으면 해당 3의 거듭제곱을 중복해서 포함해야 하므로 NO.

 * " 삼삼한 수는 3의 거듭제곱인 수가 반드시 하나 이상 포함되어야 한다."
 => 0 은 삼삼하지 않음.
*/

let flag = true;
if (input === 0) {
  flag = false;
} else {
  const base_3 = input.toString(3);
  // console.log(base_3);
  for (let digit of base_3) {
    if (digit < 2) continue;
    flag = false;
    break;
  }
}
console.log(flag ? 'YES' : 'NO');
