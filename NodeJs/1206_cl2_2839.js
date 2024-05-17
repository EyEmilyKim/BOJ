// https://www.acmicpc.net/problem/2839
/*
설탕 배달

상근이는 요즘 설탕공장에서 설탕을 배달하고 있다. 상근이는 지금 사탕가게에 설탕을 정확하게 N킬로그램을 배달해야 한다. 설탕공장에서 만드는 설탕은 봉지에 담겨져 있다. 봉지는 3킬로그램 봉지와 5킬로그램 봉지가 있다.

상근이는 귀찮기 때문에, 최대한 적은 봉지를 들고 가려고 한다. 예를 들어, 18킬로그램 설탕을 배달해야 할 때, 3킬로그램 봉지 6개를 가져가도 되지만, 5킬로그램 3개와 3킬로그램 1개를 배달하면, 더 적은 개수의 봉지를 배달할 수 있다.

상근이가 설탕을 정확하게 N킬로그램 배달해야 할 때, 봉지 몇 개를 가져가면 되는지 그 수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = Number(require('fs').readFileSync(path).toString().trim());
// console.log(input);

// 문제 로직

// 3kg, 5kg 봉지수 조합 담을 객체
let minBags = {
  bag3: 0,
  bag5: 0,
  total: 999999999, // N이 주어지는 범위는 (3 ≤ N ≤ 5000)
};
// console.log(minBags);

// 가능한 조합 구해서 봉지 수 합 작은 것 저장
for (let i = 0; i <= Math.floor(input / 3); i++) {
  const bag3 = i;
  const target = input - bag3 * 3;
  if (target % 5 !== 0) continue;
  const bag5 = target / 5;
  const total = bag3 + bag5;
  if (total < minBags['total']) {
    minBags['bag3'] = bag3;
    minBags['bag5'] = bag5;
    minBags['total'] = total;
    // console.log(i, minBags);
  }
}

// 출력하기
if (minBags['total'] === 999999999) console.log(-1);
else console.log(minBags['total']);
