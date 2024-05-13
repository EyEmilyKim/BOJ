// https://www.acmicpc.net/problem/2292
/*
벌집

위의 그림과 같이 육각형으로 이루어진 벌집이 있다. 그림에서 보는 바와 같이 중앙의 방 1부터 시작해서 이웃하는 방에 돌아가면서 1씩 증가하는 번호를 주소로 매길 수 있다. 숫자 N이 주어졌을 때, 벌집의 중앙 1에서 N번 방까지 최소 개수의 방을 지나서 갈 때 몇 개의 방을 지나가는지(시작과 끝을 포함하여)를 계산하는 프로그램을 작성하시오. 예를 들면, 13까지는 3개, 58까지는 5개를 지난다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = Number(require('fs').readFileSync(path).toString());
// console.log(N);

//문제 로직

// 1개 :  1 ~  1
// 2개 :  2 ~  7 ( +1,  +6)
// 3개 :  8 ~ 19 ( +6, +12)
// 4개 : 20 ~ 37 (+12, +18)
// 5개 : 38 ~ 61 (+18, +24)
// 6개 : 62 ~ 91 (+24, +30) // 끝 번호 : +6x ...

let endNum = 1;
let round = 1;
while (endNum < N) {
  endNum += 6 * round;
  // console.log(round, endNum);
  round++;
}
console.log(round);
