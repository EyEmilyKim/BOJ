// https://www.acmicpc.net/problem/1966
/*
프린터 큐

여러분도 알다시피 여러분의 프린터 기기는 여러분이 인쇄하고자 하는 문서를 인쇄 명령을 받은 ‘순서대로’, 즉 먼저 요청된 것을 먼저 인쇄한다. 여러 개의 문서가 쌓인다면 Queue 자료구조에 쌓여서 FIFO - First In First Out - 에 따라 인쇄가 되게 된다. 하지만 상근이는 새로운 프린터기 내부 소프트웨어를 개발하였는데, 이 프린터기는 다음과 같은 조건에 따라 인쇄를 하게 된다.

현재 Queue의 가장 앞에 있는 문서의 ‘중요도’를 확인한다.
나머지 문서들 중 현재 문서보다 중요도가 높은 문서가 하나라도 있다면, 이 문서를 인쇄하지 않고 Queue의 가장 뒤에 재배치 한다. 그렇지 않다면 바로 인쇄를 한다.
예를 들어 Queue에 4개의 문서(A B C D)가 있고, 중요도가 2 1 4 3 라면 C를 인쇄하고, 다음으로 D를 인쇄하고 A, B를 인쇄하게 된다.

여러분이 할 일은, 현재 Queue에 있는 문서의 수와 중요도가 주어졌을 때, 어떤 한 문서가 몇 번째로 인쇄되는지 알아내는 것이다. 예를 들어 위의 예에서 C문서는 1번째로, A문서는 3번째로 인쇄되게 된다.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const T = +input.shift();
// console.log(T, input);

// 문제 로직

const result = []; // 결과 담을 배열

// 테스트 케이스 차례대로 수행
for (let i = 0; i < T; i++) {
  // 테스트 케이스의 값 파싱
  const [N, idx] = input.shift().split(' ').map(Number);
  const rank = input.shift().split(' ').map(Number);

  // 문서 번호 queue
  const index = [];
  for (let n = 0; n < N; n++) index.push(n);

  // 중요도 확인하며 인쇄
  const print = []; // 인쇄 순서 담을 배열
  while (index.length > 0) {
    if (index.length === 1) {
      // 마지막 1개 남았으면 인쇄
      print.push(index.shift());
      rank.shift();
    } else {
      // 우선순위가 가장 큰지 확인
      if (rank[0] === Math.max(...rank)) {
        print.push(index.shift());
        rank.shift();
      } else {
        rank.push(rank.shift());
        index.push(index.shift());
      }
    }
  }

  // 타겟 문서의 순번 결과에 저장
  const target = print.indexOf(idx) + 1;
  result.push(target);
}

// 결과 출력
console.log(result.join('\n'));
