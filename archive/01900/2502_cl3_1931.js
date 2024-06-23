// https://www.acmicpc.net/problem/1931
/*
회의실 배정

한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자. 단, 회의는 한번 시작하면 중간에 중단될 수 없으며 한 회의가 끝나는 것과 동시에 다음 회의가 시작될 수 있다. 회의의 시작시간과 끝나는 시간이 같을 수도 있다. 이 경우에는 시작하자마자 끝나는 것으로 생각하면 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const n = input.shift();
const mtng = input.map((i) => i.split(' ').map(Number));
// console.log(n, mtng);

// 문제 로직
/**
 * 그리디 알고리즘
 * 일찍 끝나는 회의부터  => 끝나는 시간 오름차순
  + 끝나는 시간 같으면 일찍 시작하는 회의부터 (최대한 공백시간 없이 다음팀 오도록)
*/
// 후보 회의 정렬
mtng.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));
// console.log(mtng);
// 회의실 운영
const mtngDone = [mtng[0]]; // 실제 회의실 사용한 미팅
let shift = mtng[0][1]; // 점유중인 회의 끝나는 시간
for (let i = 1; i < mtng.length; i++) {
  const [start, end] = mtng[i];
  if (start >= shift) {
    mtngDone.push(mtng[i]);
    shift = end;
  }
}
// 결과 출력
// console.log(mtngDone);
console.log(mtngDone.length);
