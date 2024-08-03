// https://www.acmicpc.net/problem/31825
/*
알파벳과 쿼리 (Easy)

다음 조건들을 만족하는 부분 문자열을 알파벳 묶음이라고 하자.

하나의 동일한 알파벳으로만 문자열이 이루어져 있어야 한다.
전체 문자열에서 해당 부분 문자열을 포함한 길이가 더 긴 부분 문자열로 알파벳 묶음을 만들 수 있으면 그 부분 문자열은 알파벳 묶음이 아니다.
예를 들어 "AAABBAAC"와 같은 문자열이 있을 때, 알파벳 묶음은 "AAA", "BB", "AA", "C"로 4개다. 위의 문자열에서 "B", "AC"는 조건을 만족하지 않으므로 알파벳 묶음이 아니다.
...

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [N, Q] = input[0].split(' ').map(Number);
const S = input[1];
const query = [];
for (let i = 0; i < Q; i++) {
  query.push(input[2 + i].split(' ').map(Number));
}
// console.log(N, S, query);

// 문제 로직
// 알파벳 묶음 개수 세는 함수
function countSet(str) {
  let cnt = 1;
  const len = str.length;
  for (let i = 1; i < len; i++) if (str[i] !== str[i - 1]) cnt++;
  return cnt;
}
// 각 알파벳을 다음 알파벳으로 바꾸는 함수
function rotateChar(str) {
  const arr = Array.from(str);
  const rotatedArr = arr.map((i) => {
    if (i === 'Z') return 'A';
    return String.fromCharCode(i.charCodeAt(0) + 1);
  });
  return rotatedArr.join('');
}
// 작업 수행
const result = [];
let targetStr = S.slice();
for (let q of query) {
  const [type, start, end] = q;
  if (type === 1) {
    const tmpStr = targetStr.slice(start - 1, end);
    const cnt = countSet(tmpStr);
    result.push(cnt);
    // console.log(tmpStr, cnt);
  } else if (type === 2) {
    // console.log(targetStr);
    const tmpStr = targetStr.slice(start - 1, end);
    const left = targetStr.slice(0, start - 1);
    const right = targetStr.slice(end);
    const middle = rotateChar(tmpStr);
    // console.log(left, middle, right);
    targetStr = left + middle + right;
  }
}
console.log(result.join('\n'));
