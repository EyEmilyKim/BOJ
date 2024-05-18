// https://www.acmicpc.net/problem/10250
/*
ACM 호텔

...

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...test] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, test);

// 문제 로직
const getRoom = (str) => {
  const [H, W, N] = str.trim().split(' '); // 6,12,10
  const div = Math.floor(N / H); // 1
  const namuji = N % H; // 4
  let room = 0;
  if (namuji === 0) {
    room = H * 100 + div;
  } else room = namuji * 100 + div + 1; // 402
  return room;
};

// console.log(getRoom('3 10 9')); // 303
// console.log(getRoom('3 10 10')); // 104
test.forEach((i) => console.log(getRoom(i)));
