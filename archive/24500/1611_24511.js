// https://www.acmicpc.net/problem/24511
/*
queuestack

한가롭게 방학에 놀고 있던 도현이는 갑자기 재밌는 자료구조를 생각해냈다. 그 자료구조의 이름은 queuestack이다.

queuestack의 구조는 다음과 같다. 
$1$번, 
$2$번, ... , 
$N$번의 자료구조(queue 혹은 stack)가 나열되어있으며, 각각의 자료구조에는 한 개의 원소가 들어있다.

queuestack의 작동은 다음과 같다.

 
- $x_0$을 입력받는다.
- $x_0$을 $1$번 자료구조에 삽입한 뒤 $1$번 자료구조에서 원소를 pop한다. 그때 pop된 원소를 $x_1$이라 한다.
- $x_1$을 $2$번 자료구조에 삽입한 뒤 $2$번 자료구조에서 원소를 pop한다. 그때 pop된 원소를 $x_2$이라 한다.
- ...
- $x_{N-1}$을 $N$번 자료구조에 삽입한 뒤 $N$번 자료구조에서 원소를 pop한다. 그때 pop된 원소를 $x_N$이라 한다.
- $x_N$을 리턴한다.

도현이는 길이 $M$의 수열 $C$를 가져와서 수열의 원소를 앞에서부터 차례대로 queuestack에 삽입할 것이다. 이전에 삽입한 결과는 남아 있다. (예제 
$1$ 참고)

queuestack에 넣을 원소들이 주어졌을 때, 해당 원소를 넣은 리턴값을 출력하는 프로그램을 작성해보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const data = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +data[0];
const type = data[1].split(' ').map(Number);
const origin = data[2].split(' ').map(Number);
let M = +data[3];
const input = data[4].split(' ').map(Number);
// console.log(N, type);
// console.log('origin', origin);
// console.log('input', M, input);

// 문제 로직
/**
 * 단순히 원래 자료구조에서 스택만 무시해서 모두 순회하면 시간초과 발생
 => 불필요한 스택 제거하여 큐만 남은 자료구조에서 작업 수행..
 
 * 일일이 배열 값 바꿔쓰는 것도 시간 로스가 크다
 => 심플하게 일렬로 줄지어진 값들이 차례로 밀어나온다 생각하고 M개만 담으면?
 */

// 결과값에 영향 미치지 않는 스택 제거
const queue = [];
for (let i = 0; i < N; i++) {
  if (type[i] === 0) queue.push(origin[i]);
}
// console.log('queue', queue);

// 작업 수행
const result = [];
const reversedInput = input.reverse();
// M 개의 output 을 주워담는데
while (M-- > 0) {
  let output;
  // queue 에 원래 있던 값 끝에서부터 밀려나오고
  if (queue.length) output = queue.pop();
  // inputData 값 앞에서부터 밀려나옴
  else output = reversedInput.pop();
  result.push(output);
}

// 결과 출력
console.log(result.join(' '));
