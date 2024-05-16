// https://www.acmicpc.net/problem/2231
/*
분해합

어떤 자연수 N이 있을 때, 그 자연수 N의 분해합은 N과 N을 이루는 각 자리수의 합을 의미한다. 어떤 자연수 M의 분해합이 N인 경우, M을 N의 생성자라 한다. 예를 들어, 245의 분해합은 256(=245+2+4+5)이 된다. 따라서 245는 256의 생성자가 된다. 물론, 어떤 자연수의 경우에는 생성자가 없을 수도 있다. 반대로, 생성자가 여러 개인 자연수도 있을 수 있다.

자연수 N이 주어졌을 때, N의 가장 작은 생성자를 구해내는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직
const getM = (N) => {
  let M = 0;
  for (let i = 1; i < N; i++) {
    const str = i.toString();
    const digit = str.length;
    let sum = 0;
    for (let j = 0; j < digit; j++) {
      sum += Number(str[j]);
    }
    if (sum === N - i) {
      M = i;
      break;
    }
  }
  return M;
};

console.log(getM(input));
