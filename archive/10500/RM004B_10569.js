// https://www.acmicpc.net/problem/10569
/*
다면체

수학자가 구를 깎아서 볼록다면체를 만들었다. 이 수학자는 임의의 볼록다면체에 대해 (꼭짓점의 수) - (모서리의 수) + (면의 수) = 2가 성립한다는 것을 알고 있다. 그래서 구를 깎는 게 취미인 이 사람은 꼭짓점, 모서리와 면의 수를 기록할 때 꼭짓점과 모서리의 수만 세고 면의 수는 세지 않는다.

입력>
첫 번째 줄에 1 이상 100 이하의 자연수 T가 주어진다.
다음 T개의 줄에 4 이상 100 이하의 자연수 V와 E가 공백을 사이에 두고 주어진다. V와 E는 각각 꼭짓점의 개수와 모서리의 개수이다.

출력>
각 V와 E에 대해 볼록다면체의 면의 수를 한 줄에 하나씩 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
/**
 * 볼록다면체 (꼭짓점의 수 V) - (모서리의 수 E) + (면의 수 F) = 2
 */
const result = [];
for (let i of input) {
  const [V, E] = i.split(' ').map(Number);
  const face = 2 - V + E;
  result.push(face);
}
console.log(result.join('\n'));
