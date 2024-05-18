// https://www.acmicpc.net/problem/1316
/*
그룹 단어 체커

그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const num = +input.shift();
// console.log(num, input);

//문제 로직
let cnt = 0;
for (let i = 0; i < num; i++) {
  const word = input[i];
  let letter = [];
  let isGroupWord = 1;
  for (let j = 0; j < word.length; j++) {
    if (letter.indexOf(word[j]) === -1) {
      // 새로운 알파벳
      letter.push(word[j]);
    } else {
      // 이미 나온 알파벳인데
      if (letter.indexOf(word[j]) !== letter.length - 1) {
        // 방금까지 보던 그 알파벳이 아니라면
        isGroupWord = 0;
        break;
      }
    }
  }
  if (isGroupWord) {
    cnt++;
  }
}
console.log(cnt);
