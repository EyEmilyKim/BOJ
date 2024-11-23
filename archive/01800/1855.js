// https://www.acmicpc.net/problem/1855
/*
암호

준표와 세준이는 서로 솔루션을 토론 하면서 다른 사람이 자신들의 솔루션을 듣지 못하게 하도록 서로 메시지를 주고받을 때 메시지를 암호화 하여서 주고받았다. 암호를 만드는 방법은 다음과 같다. 먼저 암호화 할 문자열을 1,1부터 위에서 아래 순서대로 채운다. 그리고 가장 밑의 행을 채운 후에는 오른쪽 열에서 다시 같은 과정을 반복한다.

만약에 "abcdefghijkl" 이라는 문자열을 3개의 열로 암호화 한다고 하자. 그러면 다음과 같이 표를 채울 수 있을 것이다.

a	e	i
b	f	j
c	g	k
d	h	l

그런 후에는 이제 왼쪽 → 오른쪽, 오른쪽 → 왼쪽, 왼쪽 → 오른쪽 ... 으로 읽으면서 다시 문자열을 만든다. 위의 경우에는 "aeijfbcgklhd" 가 될 것이다.

우리가 할 일은 다음과 같다. 암호화 된 문자열과 몇 개의 열로 암호화를 하였는지 주어져 있을 때 원래의 문자열을 구하는 프로그램을 작성하여라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직
const col = +input[0];
const row = input[1].length / col;
const given = Array.from(input[1]);
const table = [];
for (let i = 0; i < row; i++) {
  const arr = given.splice(0, col);
  // console.log(i, arr);
  if (i % 2 === 0) table.push(arr);
  if (i % 2 === 1) table.push(arr.reverse());
}
// console.log(table);
let result = '';
for (c = 0; c < col; c++) {
  for (r = 0; r < row; r++) {
    result += table[r][c];
  }
}
console.log(result);
