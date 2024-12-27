// https://www.acmicpc.net/problem/7510
/*
고급 수학

준규는 집을 짓고 있다. 준규는 모든 벽 모양을 직각 삼각형으로 만들려고 한다. 적절히 나무를 잘라 삼각형을 만들었지만, 준규는 각도를 측정할 수 있는 도구를 가지고 있지 않다. 어쩔 수 없이 줄자를 이용해 삼각형 세 변의 길이를 측정한 다음, 직각 삼각형인지 아닌지를 알아보려고 한다.

삼각형 세 변의 길이가 주어졌을 때, 직각 삼각형인지 아닌지를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [t, ...data] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(t, data);

// 문제 로직
const result = [];
let cnt = 0;
while (cnt++ < Number(t)) {
  let output = 'Scenario #' + cnt + ':\n';
  const lines = data.shift().split(' ').map(Number);
  lines.sort((a, b) => a - b);
  const [a, b, c] = lines;
  output += a ** 2 + b ** 2 === c ** 2 ? 'yes' : 'no';
  result.push(output);
}
console.log(result.join('\n\n'));
