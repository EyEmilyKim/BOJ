// https://www.acmicpc.net/problem/11068
/*
회문인 수

어떤 수를 왼쪽부터 읽어도, 오른쪽부터 읽어도 같을 때 이 수를 회문인 수라고 한다. 예를 들어, 747은 회문인 수이다. 255도 회문인 수인데, 16진수로 표현하면 FF이기 때문이다. 양의 정수를 입력받았을 때, 이 수가 어떤 B진법 (2 ≤ B ≤ 64)으로 표현하면 회문이 되는 경우가 있는지 알려주는 프로그램을 작성하시오. B진법이란, 한 자리에서 수를 표현할 때 쓸 수 있는 수의 가짓수가 B라는 뜻이다. 예를 들어, 십진법에서 B는 10이다. 

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/).map(Number);
const [N, ...nums] = input;
// console.log(N, nums);

// 문제 로직
/**
 * 11진법 부터는 0~9 만으로 표현이 안되고
 * 33진법 부터는 0~9, 알파벳 다 동원해도 각자리 수를 한자리 문자로 표기 못한다.
 * 하지만, 꼭 완성된 문자열로 B진법 수를 적어내지 못하더라도
 * 펠린드롬 판별 비교를 위해서는 B진수일 때 각 자리 수가 뭔지만 알면 된다.
 */

// 진법 변환 함수 (완성된 문자열로 처리하지 않고 각 자리 수 담은 배열 반환)
function convertNinR(n, r) {
  if (r <= 36) return Array.from(n.toString(r));
  let num = n;
  let mod = n;
  const remainder = [];
  while (mod > 0) {
    mod = Math.floor(num / r);
    remainder.push(num % r);
    num = mod;
  }
  return remainder.reverse();
}

// 각자리 수 배열로 받아 펠린드롬 판별하는 함수
function isPelindrom(arr) {
  const len = arr.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i <= mid; i++) {
    if (arr[i] !== arr[len - 1 - i]) return false;
  }
  return true;
}

// 작업 수행
const result = [];
for (let n of nums) {
  // console.log('--------------');
  let flag = false;
  for (let r = 2; r <= 64; r++) {
    const n_r = convertNinR(n, r);
    // console.log('r', r, 'n_r', n_r);
    if (isPelindrom(n_r)) {
      flag = true;
      break;
    }
  }
  result.push(flag ? 1 : 0);
}
console.log(result.join('\n'));
