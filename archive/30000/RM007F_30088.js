// https://www.acmicpc.net/problem/30088
/*
공포의 면담실

한국정보기술진흥원의 직원들은 6개월에 한 번 씩 전 직원이 사장님과 일대일 면담을 진행한다.

진흥원에는 
$N$개의 부서가 있는데, 부서에 소속된 모든 직원이 모두 면담을 마쳐야 해당 부서가 퇴근할 수 있다고 한다. 면담은 한 번에 한 명씩만 진행된다.

모든 부서의 퇴근 시간의 합이 최소가 되는 값을 구하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input.shift();
const team = input.map((i) => i.split(' ').map(Number));
// console.log(N, team);

// 문제 로직
/**
 * 그리디 알고리즘 :
 => 한 부서 씩, 빠르게 끝나는 부서부터.
*/

const sum = team.map((i) => i.slice(1).reduce((a, b) => a + b));
sum.sort((a, b) => a - b);
// console.log(sum);
let total = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    total += sum[j];
  }
}
console.log(total);
