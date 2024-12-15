// https://www.acmicpc.net/problem/2448
/*
별 찍기 - 11

예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const N = +require('fs').readFileSync(path).toString().trim();
// console.log(N);

// 문제 로직
/**
 * 분할 정복. 

 * 출력할 내용 : '*' 또는 '_' 가 들어가는 2차원 배열 
 * => 높이(행) : N , 너비(열) : 2N-1 (규칙성 1)

 * N=3 일 때가 가장 작은 단위의 트리(base tree)이며, 그것을 2^k 곱하며 프렉탈 복사.
 * 가장 큰 레벨(input, N) 삼각형에서 N=3 될때까지 점점 더 작은 단위로 재귀적으로 쪼개갈 때
 * 상단 서브삼각형(1), 좌하단 서브삼각형(2), 우하단 서브삼각형(3) 패턴이 반복됨 (규칙성 2)
 * => 주어진 N을 2로 나누면서 재귀 분할하여 N=3 이 됐을 때 base tree를 찍어주자 !

 * 트리가 들어가는 박스의 좌상단 귀퉁이를 기준점으로 잡고, 
 * 구조 분할 시 서브구조들의 기준점 찾는 점화식 (엑셀에 행&렬 번호 매겨놓고 그려보며 구함..)
 * => 
 * 기준점 f(num(N), row, col) 레벨 삼각형을 분할해서 나오는 서브 삼각형들의 기준점 (규칙성 3)
 * 1 상단 : f(num/2, row, col+num/2)
 * 2 좌하단: f(num/2, row+num/2, col)
 * 3 우하단: f(num/2, row+num/2, col+num)
 */

const tree = ['  *  ', ' * * ', '*****']; // base tree 틀
const result = Array.from({ length: N }, () => Array.from({ length: 2 * N - 1 }, () => ' ')); // 미리 공란으로 다 채워두기
// console.log(result.map((r) => r.map((v) => (v = '_')).join('')).join('\n'));

function divideAndDraw(num, row, col) {
  // console.log([num, row, col]);

  // base tree 레벨까지 내려오면 별표 찍기
  if (num === 3) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        result[row + i][col + j] = tree[i][j];
      }
    }
    return;
  }

  const sub = num / 2;
  divideAndDraw(sub, row, col + sub);
  divideAndDraw(sub, row + sub, col);
  divideAndDraw(sub, row + sub, col + num);
}

divideAndDraw(N, 0, 0);
console.log(result.map((r) => r.join('')).join('\n'));
