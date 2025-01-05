// https://www.acmicpc.net/problem/4344
/*
평균은 넘겠지

대학생 새내기들의 90%는 자신이 반에서 평균은 넘는다고 생각한다. 당신은 그들에게 슬픈 진실을 알려줘야 한다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : './example.txt';
const [[c], ...tc] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((r) => r.split(' ').map(Number));
// console.log(c, tc);

// 문제 로직
const result = [];
for (let t of tc) {
  const [N, ...score] = t;
  const sum = score.reduce((a, v) => a + v);
  const ave = sum / N;
  let overAve = 0;
  score.forEach((v) => {
    if (v > ave) overAve++;
  });
  const share = (overAve / N) * 100;
  result.push(share.toFixed(3) + '%');
}
console.log(result.join('\n'));
