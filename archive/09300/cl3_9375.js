// https://www.acmicpc.net/problem/9375
/*
패션왕 신해빈

해빈이는 패션에 매우 민감해서 한번 입었던 옷들의 조합을 절대 다시 입지 않는다. 예를 들어 오늘 해빈이가 안경, 코트, 상의, 신발을 입었다면, 다음날은 바지를 추가로 입거나 안경대신 렌즈를 착용하거나 해야한다. 해빈이가 가진 의상들이 주어졌을때 과연 해빈이는 알몸이 아닌 상태로 며칠동안 밖에 돌아다닐 수 있을까?

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
// console.log(N, input);

// 문제 로직
const result = [];
while (input.length) {
  let t = +input.shift();
  const inven = {};
  while (t--) {
    const [item, parts] = input.shift().split(' ');
    inven[parts] = (inven[parts] ?? 0) + 1;
  }
  // console.log(inven);
  const outfit = [...Object.values(inven)].reduce((acc, v) => acc * (v + 1), 1) - 1;
  result.push(outfit);
}
console.log(result.join('\n'));
/** 
 * 알몸으로 나가지 않는 경우의 수 :
  각각의 파츠에 대해 입는 경우(=> 해당 파츠 개수) + 안입는 경우(=> 1)
  파츠별 ↑를 다 곱하면 가능한 모든 조합의 수
  단, 아무것도 안입는 건 허용 안되므로 -1
*/
