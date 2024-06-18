// https://www.acmicpc.net/problem/2238
/*
경매

경매는 여러 사람이 하나의 물건을 사려고 할 때, 각 사람이 원하는 가격을 제시하면 그 중 가장 높은 가격으로 물건을 팔게 되는 방식이다. 이러한 고전적인 경매 방식은 꽤 널리 쓰이는데, 최근에는 인터넷 쇼핑몰에서 반대의 경매 방식을 택하기도 한다. 즉, 여러 사람이 가격을 제시하면, 그 중 가장 낮은 가격으로 물건을 팔게 되는 방식도 쓰인다.

하지만 이럴 경우, 모든 사람들이 1원에 물건을 사겠다고 하는 사태가 발생할 수 있다. 따라서 같은 가격을 제시한 사람이 둘 이상일 경우에는 무효로 하는 방식이 쓰인다. 하지만 모든 가격을 여러 사람이 제시하는 경우도 있을 수 있기 때문에, 다음과 같은 방식으로 경매 당첨자를 선택하기로 한다.

우선 가장 적은 수의 사람이 제시한 가격을 찾는다. 이러한 경우가 여럿 있다면, 가장 낮은 가격으로 물건을 팔게 된다. 이때, 그 가격을 제시한 사람들 중에서 가장 먼저 제시한 사람이 물건을 살 수 있게 된다.

각각의 사람들이 제시한 가격이 주어졌을 때, 경매에 낙찰(당첨)되는 사람을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const [U, N] = input.shift().split(' ').map(Number);
// console.log(U, N, input);

// 문제 로직

// 입찰 결과 맵
const map = new Map();
input.forEach((i) => {
  const tmp = i.split(' ');
  const name = tmp[0];
  const price = +tmp[1];
  if (map.has(price)) map.set(price, [...map.get(price), name]);
  else map.set(price, [name]);
});
// console.log(map);

// 낙찰 가격 결정
// 입찰자 수 가장 적은 가격 찾기
let minNum = 100000; // (1 ≤ N ≤ 100,000)
let minNumPrice = [];
map.forEach((names, price) => {
  // console.log(key, val);
  const num = names.length;
  if (num < minNum) {
    minNum = num;
    minNumPrice = [price];
  } else if (num === minNum) {
    minNumPrice.push(price);
  }
});
// console.log('minNum', minNum, 'minNumPrice', minNumPrice);
const finalPrice = Math.min(...minNumPrice); // 최종 낙찰 가격
// 최종 낙찰자 결정
const winner = map.get(finalPrice)[0];

// 출력
console.log(winner, finalPrice);
