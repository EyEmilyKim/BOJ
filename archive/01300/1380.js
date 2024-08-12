// https://www.acmicpc.net/problem/1380
/*
귀걸이

파스칼 고등학교에 다니는 많은 여학생들은 규정에 없는 귀걸이를 착용한 채 도망다닙니다. Sneddon 교감선생님은 흔들거리는 긴 빨간 귀걸이들을 볼때마다 압수합니다.

교감선생님은 귀걸이를 압수당한 여학생들을 숫자를 매겨 리스트를 작성하고 있습니다. 그리고 압수한 귀걸이 뒤쪽에 여학생 번호와 마음대로 선택한 'A' 또는 'B'를 함께 적어두었습니다.

모든 정규 일과와 방과후 수업의 감금이 끝나면, 여학생들은 교감선생님을 찾아와 귀걸이를 돌려받습니다. 불행하게도 어느 날, 교감선생님은 귀걸이가 든 봉투를 잃어버렸고, 하나를 끝내 찾지 못했습니다.

귀걸이를 받지 못해 화난 소녀의 이름을 교감선생님께 알려주세요.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(input);

// 문제 로직
const result = [];
let scene = 1;
let idx = 0;
while (input[idx] > 0) {
  const n = input[idx++];
  const name = {}; // 이름 명단
  const map = new Map(); // 귀걸이 압수,반환 기록
  for (let i = 1; i <= n; i++) name[i] = input[idx++];
  for (let i = 0; i < 2 * n - 1; i++) {
    const [num, tag] = input[idx++].split(' ');
    if (!map.has(num)) map.set(num, true); // 보관중
    else map.set(num, false); // 돌려줌
  }
  // console.log('name', name);
  // console.log('map', map);
  map.forEach((val, key) => {
    if (val) result.push(`${scene++} ${name[key]}`);
  });
}
console.log(result.join('\n'));
