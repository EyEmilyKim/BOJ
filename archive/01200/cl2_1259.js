// https://www.acmicpc.net/problem/1259
/*
팰린드롬수

어떤 단어를 뒤에서부터 읽어도 똑같다면 그 단어를 팰린드롬이라고 한다. 'radar', 'sees'는 팰린드롬이다.
수도 팰린드롬으로 취급할 수 있다. 수의 숫자들을 뒤에서부터 읽어도 같다면 그 수는 팰린드롬수다.

10은 팰린드롬수가 아닌데, 앞에 무의미한 0이 올 수 있다면 010이 되어 팰린드롬수로 취급할 수도 있지만, 특별히 이번 문제에서는 무의미한 0이 앞에 올 수 없다고 하자.

출력>
각 줄마다 주어진 수가 팰린드롬수면 'yes', 아니면 'no'를 출력한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
// console.log(input);

// 문제 로직
input.forEach((i) => {
  const arr = i.split('');
  const origin = arr.slice();
  arr.reverse();
  let isPelin = 1;
  for (let n = 0; n < arr.length; n++) {
    if (origin[n] !== arr[n]) {
      isPelin = 0;
      break;
    }
  }
  console.log(isPelin ? 'yes' : 'no');
});
