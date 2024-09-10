// https://www.acmicpc.net/problem/6064
/*
카잉 달력

최근에 ICPC 탐사대는 남아메리카의 잉카 제국이 놀라운 문명을 지닌 카잉 제국을 토대로 하여 세워졌다는 사실을 발견했다. 카잉 제국의 백성들은 특이한 달력을 사용한 것으로 알려져 있다. 그들은 M과 N보다 작거나 같은 두 개의 자연수 x, y를 가지고 각 년도를 <x:y>와 같은 형식으로 표현하였다. 그들은 이 세상의 시초에 해당하는 첫 번째 해를 <1:1>로 표현하고, 두 번째 해를 <2:2>로 표현하였다. <x:y>의 다음 해를 표현한 것을 <x':y'>이라고 하자. 만일 x < M 이면 x' = x + 1이고, 그렇지 않으면 x' = 1이다. 같은 방식으로 만일 y < N이면 y' = y + 1이고, 그렇지 않으면 y' = 1이다. <M:N>은 그들 달력의 마지막 해로서, 이 해에 세상의 종말이 도래한다는 예언이 전해 온다.

예를 들어, M = 10 이고 N = 12라고 하자. 첫 번째 해는 <1:1>로 표현되고, 11번째 해는 <1:11>로 표현된다. <3:1>은 13번째 해를 나타내고, <10:12>는 마지막인 60번째 해를 나타낸다.

네 개의 정수 M, N, x와 y가 주어질 때, <M:N>이 카잉 달력의 마지막 해라고 하면 <x:y>는 몇 번째 해를 나타내는지 구하는 프로그램을 작성하라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [T, ...test] = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
// console.log(T, test);

// 문제 로직
/**
 * 마지막 해 = M,N 최소공배수

 * 브루트 포스
단, 단순하게 멸망 년도까지 1부터 다 돌며 탐색하면 시간 초과 발생한다.
X,Y 모두 매년 +1 되고 X는 M년 마다, Y는 N년 마다 현재의 X,Y 값을 갖게 됨
=> 햇수 카운트용 (x,y) = (X,Y) 로 시작해 
x,y 크기 비교하면서 더 작은 쪽에 M 또는 N 을 더해주다가 
x=y 된 해가 정답.
 */

// <X:Y> 달력이 몇번째 해인지 구하는 함수
function countYear([M, N, X, Y]) {
  const limitYear = getLCM(M, N); // 마지막 해 = M,N 최소공배수
  let [x, y] = [X, Y];
  while (true) {
    if (x > limitYear || y > limitYear) return -1; // 멸망
    else if (x > y) y += N;
    else if (x < y) x += M;
    else return x;
  }
}
// 최소공배수 찾는 함수 (유클리드 호제법)
function getLCM(a, b) {
  let [x, y] = [a, b].sort((a, b) => a - b);
  let r;
  while (y) {
    r = x % y;
    x = y;
    y = r;
  }
  const GCD = x;
  const LCM = (a * b) / GCD;
  // console.log('GCD', GCD);
  // console.log('LCM', LCM);
  return LCM;
}

// 작업 수행
const result = [];
for (const t of test) {
  result.push(countYear(t));
}
console.log(result.join('\n'));
