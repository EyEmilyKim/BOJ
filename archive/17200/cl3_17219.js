// https://www.acmicpc.net/problem/17219
/*
비밀번호 찾기

2019 HEPC - MAVEN League의 "비밀번호 만들기"와 같은 방식으로 비밀번호를 만든 경민이는 한 가지 문제점을 발견하였다. 비밀번호가 랜덤으로 만들어져서 기억을 못 한다는 것이었다! 그래서 경민이는 메모장에 사이트의 주소와 비밀번호를 저장해두기로 했다. 하지만 컴맹인 경민이는 메모장에서 찾기 기능을 활용하지 못하고 직접 눈으로 사이트의 주소와 비밀번호를 찾았다. 메모장에 저장된 사이트의 수가 늘어나면서 경민이는 비밀번호를 찾는 일에 시간을 너무 많이 쓰게 되었다. 이를 딱하게 여긴 문석이는 경민이를 위해 메모장에서 비밀번호를 찾는 프로그램을 만들기로 결심하였다! 문석이를 도와 경민이의 메모장에서 비밀번호를 찾아주는 프로그램을 만들어보자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' '));
const [N, M] = input.shift().map(Number);
const memo = input.slice(0, N);
const target = input.slice(N);
// console.log(N, M);
// console.log(memo);
// console.log(target);

// 문제 로직
const dic = {};
for (let m of memo) {
  const [site, pw] = m;
  dic[site] = pw;
}
// console.log(dic);
const result = [];
for (let t of target) {
  result.push(dic[t]);
}
console.log(result.join('\n'));

// 실행시간 측정 종료
console.timeEnd(`-----\n`);
