// https://www.acmicpc.net/problem/9437
/*
사라진 페이지 찾기

꿍은 수능에 응시하고 있었는데 어느덧 4교시 탐구영역 시간이 되었다. 그런데 탐구영역은 다른 영역과 다르게 자기가 응시할 과목만 고르고 응시하지 않는 과목은 바닥에 버리도록 되어있다. 꿍이 응시하지 않는 과목을 골라 뽑아내던 중 문득 궁금한게 생겼다. 만약 탐구영역 시험지가 아래와 같이 전체 12쪽으로 되어 있었다고 하자. 
...

그렇다면 1쪽과 12쪽은 한 면에, 2쪽과 11쪽이 한면에, ... 6쪽과 7쪽이 한면에 인쇄되어 있고 1,2,11,12쪽이 한 장, 3,4,9,10쪽이 한 장, 5,6,7,8이 한 장 이다. 그래서 만약 꿍이 2쪽이 인쇄된 종이 한 장을 바닥에 버렸을 때, 그 종이에 인쇄된 나머지 쪽, 즉 사라진 페이지들은 1,11,12쪽이다.

꿍이 탐구영역을 응시할 동안 여러분들은 한 쪽의 페이지만으로 사라진 나머지의 페이지들을 찾아주어라.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
// console.log(input);

// 문제 로직 - 방법 2 : 타겟 페이지만 계산해서 답하기. 빠름 ㅋ
const result = [];
input.forEach((i) => {
  const [N, P] = i.split(' ').map(Number);
  const sum = 1 + N; // = 모든 펼친 면 좌우 페이지 숫자 합
  const isHolsu = P % 2 === 1 ? true : false; // 타겟 페이지 홀수?짝수?
  const pageSet = []; // 같은 장에 인쇄된 페이지 저장
  if (isHolsu) {
    // pageSet.push(P); // ! 자기자신은 출력에서 제외
    pageSet.push(P + 1);
    pageSet.push(sum - (P + 1));
    pageSet.push(sum - P);
  } else {
    pageSet.push(P - 1);
    // pageSet.push(P); // ! 자기자신은 출력에서 제외
    pageSet.push(sum - P);
    pageSet.push(sum - (P - 1));
  }
  pageSet.sort((a, b) => a - b); // 오름차순 정렬
  // console.log(pageSet);
  result.push(pageSet.join(' '));
});
console.log(result.join('\n'));

// 문제 로직 - 방법 1 : 모든 장의 페이지set 정리해놓고 답하기

// 사라진 나머지 페이지 알아내는 함수
function getLostPage(num, page) {
  // 전체 장 수 얻어서 각 장의 페이지set 구하기
  const paper = num / 4;
  const pageSetArr = Array.from(new Array(paper), () => []);
  let start = 1;
  let end = num;
  for (let i = 0; i < paper; i++) {
    pageSetArr[i].push(start++);
    pageSetArr[i].push(start++);
    pageSetArr[i].push(end - 1);
    pageSetArr[i].push(end);
    end -= 2;
  }
  // console.log(paper, pageSetArr);
  // 각 페이지의 같은 장 페이지 딕셔너리
  const dic = {};
  pageSetArr.forEach((set) => {
    set.forEach((i) => {
      dic[i] = set.filter((ea) => ea !== i);
    });
  });
  // console.log(dic);
  // 타겟값 반환
  return dic[page].join(' ');
}

// 테스트 케이스 순회하며 작업 수행
const result1 = [];
input.forEach((i) => {
  const [N, P] = i.split(' ').map(Number);
  result1.push(getLostPage(N, P));
});
console.log(result1.join('\n'));
