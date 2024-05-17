// https://www.acmicpc.net/problem/4673
/*
셀프 넘버

어떤 자연수 N이 있을 때, 그 자연수 N의 분해합은 N과 N을 이루는 각 자리수의 합을 의미한다. 어떤 자연수 M의 분해합이 N인 경우, M을 N의 생성자라 한다. 예를 들어, 245의 분해합은 256(=245+2+4+5)이 된다. 따라서 245는 256의 생성자가 된다. 물론, 어떤 자연수의 경우에는 생성자가 없을 수도 있다. 반대로, 생성자가 여러 개인 자연수도 있을 수 있다.

자연수 N이 주어졌을 때, N의 가장 작은 생성자를 구해내는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 문제 로직 - 방법 1 : 분해합을 모두 구한 뒤, 거기 없는 것이 셀프넘버.

// 숫자 1 ~ num까지의 분해합(단, num 이하) 모두 구하는 함수
const getDNs = (num) => {
  const DNs = [];
  for (let i = 1; i <= num; i++) {
    const str = i.toString();
    const digit = str.length;
    let sum = i;
    for (let l = 0; l < digit; l++) {
      sum += Number(str[l]);
    }
    // console.log(str, sum);
    if (sum <= num) DNs.push(sum);
  }
  return DNs;
};

// input 이하의 셀프넘버 구하기
const input = 10000;
const DNs = getDNs(input);
// console.log(input, DNs);

const selfNums = [];
for (let i = 1; i <= input; i++) {
  if (!DNs.includes(i)) selfN.push(i);
}
// console.log('selfNums', selfNums);

// 출력
const result = selfN.join('\n');
console.log(answer.trim());

// 문제 로직 - 방법 2 : (0은 깍뚜기)1~N 까지의 배열에 true, false 분류하는 방법. 시간 조금더 절약됨.

// 분해합 d(n) 구하는 함수
function d(n) {
  let num = n;
  let sum = n;
  for (let i = 0; i < String(n).length; i++) {
    // num 을 10으로 나눠가며 각 자리수 합산
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

// 0 ~ range 범위까지의 배열 생성, 모두 true 로 초기화
const range = 10000;
const selfN = new Array(range + 1).fill(true);

for (let i = 0; i <= range; i++) {
  // 분해합인 숫자들은 false 로 변환
  selfN[d(i)] = false;
}

// true 인덱스만 출력
let answer = '';
for (let i = 1; i < range; i++) {
  if (selfN[i]) answer += i + '\n';
}
console.log(answer.trim());
