// https://www.acmicpc.net/problem/10811
/*
바구니 뒤집기

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);
const [N, M] = input[0].split(' ').map((val) => +val);
// console.log(N, M);

// 문제 로직
let basket = [];
for (n = 1; n <= N; n++) basket.push(n);
console.log('origin basket', basket);

for (m = 1; m <= M; m++) {
  const [i, j] = input[m].split(' ').map((val) => +val);
  console.log(`=== Round ${m} ===`, i, j);

  // 부분배열 복사
  // let arr = [];
  // for (n = i; n <= j; n++) arr.push(basket[n - 1]);
  const arr = basket.slice(i - 1, j);
  // console.log(`arr`, arr);

  // 역순으로 재배치
  // let arrRvs = [];
  // for (n = arr.length - 1; n >= 0; n--) arrRvs.push(arr[n]);
  const arrRvs = arr.reverse();
  // console.log(`arrRvs`, arrRvs);

  // 부분배열 대입
  let idx = 0;
  for (n = i; n <= j; n++) {
    basket[n - 1] = arrRvs[idx];
    idx++;
  }
  console.log(basket);
}

let result = '';
basket.forEach((i) => (result += i + ' '));
console.log(result.trim());

/**
 * 배열 함수 활용
 
 * slice(startIndex, end)
  : startIndex 부터 end 앞까지 호출한 배열의 일부 반환. 
 
 * reverse()
  : 배열 역순으로 재배치

 */
