// https://www.acmicpc.net/problem/17201
/*
자석 체인

블록체인에 대해 들은 초등학생 관빈이는 자석을 이어 붙여 자석 체인을 만든 다음, 이를 이용한 가상 화폐를 만들고 싶어졌다.

관빈이는 특이한 자석을 가지고 있는데 관빈이가 가지고 있는 자석의 (+)극에는 1이라는 숫자가 쓰여 있고, (-)극에는 2라는 숫자가 쓰여 있다. 그리고 관빈이의 자석은 막대 모양으로, (+)극과 (-)극이 하나씩 있다.

보통, 자석은 같은 극끼리는 밀어내고 다른 극끼리는 서로 끌어당겨 붙는 성질이 있다. 관빈이는 이 성질을 이용해 가지고 있는 자석들을 정성스럽게 모두 이어 붙여 연결된 자석 체인을 만든 뒤 자석 코인의 급등을 꿈꾸며 잠이 들었다. 하지만 그날 밤에, 자석 코인의 급등을 우려한 관빈이의 아버지가 연결된 자석 중 하나의 방향을 뒤집어 자석 체인을 분리했을 수도 있다! 자석 체인의 급락을 두려워하는 관빈이를 위해 자석 체인이 모두 연결되어 있는지 아닌지 알려주자.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
const N = +input[0];
const arr = input[1].split('').map(Number);
console.log(N, arr);

// 문제 로직
let isOK = true;
for (let i = 1; i < 2 * N; i++) {
  if (arr[i] === arr[i - 1]) {
    isOK = false;
    break;
  }
  console.log(arr[i - 1], arr[i], isOK);
}
console.log(isOK ? 'Yes' : 'No');
