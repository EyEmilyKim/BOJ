// https://www.acmicpc.net/problem/1193
/*
분수찾기

무한히 큰 배열에 다음과 같이 분수들이 적혀있다.

1/1	1/2	1/3	1/4	1/5	…
2/1	2/2	2/3	2/4	…	…
3/1	3/2	3/3	…	…	…
4/1	4/2	…	…	…	…
5/1	…	…	…	…	…
…	…	…	…	…	…
이와 같이 나열된 분수들을 1/1 → 1/2 → 2/1 → 3/1 → 2/2 → … 과 같은 지그재그 순서로 차례대로 1번, 2번, 3번, 4번, 5번, … 분수라고 하자.

X가 주어졌을 때, X번째 분수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const X = Number(require('fs').readFileSync(path).toString());
// console.log(X);

//문제 로직 - 방법 1: 단순 로직대로 차근차근 구하기

// idx	0    1	 2	 3	 4	 5	 6	 7	 8
//   ←       +   -   +   -   +   -   +   -
//
// 0 	  1	  2	  6	  7	  15	16	28	29	45
// 1	  3	  5	  8	  14	17	27	30	44
// 2	  4	  9	  13	18	26	31	43
// 3	  10	12	19	25	32	42
// 4	  11	20	24	33	41
// 5	  21	23	34	40
// 6	  22	35	39
// 7	  36	38
// 8	  37

// 해당 칸 분수 -> 분자 = 줄idx +1, 분모 = 열idx +1

let row = 0;
let clmn = 0;
let idxR = 0;
let idxC = 0;
let num = 1;
// console.log(num, '-', idxR, idxC);
while (num < X) {
  if (idxR === 0) {
    clmn++;
    idxC++;
    num++;
    // console.log(num, '-', idxR, idxC);
    if (num === X) break;
    for (let i = 0; i < clmn; i++) {
      row = clmn;
      idxR++;
      idxC--;
      num++;
      // console.log(num, '-', idxR, idxC);
      if (num === X) break;
    }
  } else if (idxC === 0) {
    row++;
    idxR++;
    num++;
    // console.log(num, '-', idxR, idxC);
    if (num === X) break;
    for (let i = row; i > 0; i--) {
      clmn = row;
      idxR--;
      idxC++;
      num++;
      // console.log(num, '-', idxR, idxC);
      if (num === X) break;
    }
  }
}
const Bunja = idxR + 1;
const Bunmo = idxC + 1;
console.log(Bunja + '/' + Bunmo);

//문제 로직 - 방법 2: 규칙성 찾아 빠르게 구하기

// 대각선으로 줄을 그어서
// 포인트1. n번째 줄에는 n개의 칸
// 포인트2. n번째 줄 첫번째 분자값/분모값은 (짝수) 1/n (홀수) n/1

// X는 몇번째 줄 ?
let line = 0;
let tmp = X;
while (tmp > 0) {
  line++;
  tmp -= line;
  // console.log(line, tmp);
}

// X는 그 줄의 앞에서 몇 번째 칸?
let linePosition = line + tmp;
// console.log('line', line, 'linePosition', linePosition);

// 줄 방향 고려해서 bunja, bunmo 구하기
let bunja = 0;
let bunmo = 0;
if (line % 2 === 0) {
  //짝수번째 줄이면
  bunja = 1;
  bunmo = line;
  for (let i = 0; i < linePosition - 1; i++) {
    bunja++;
    bunmo--;
  }
} else {
  //홀수번째 줄이면
  bunja = line;
  bunmo = 1;
  for (let i = 0; i < linePosition - 1; i++) {
    bunja--;
    bunmo++;
  }
}
console.log(bunja + '/' + bunmo);
