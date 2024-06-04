// https://www.acmicpc.net/problem/1620
/*
나는야 포켓몬 마스터 이다솜

... 
오박사 : 그럼 다솜아 이제 진정한 포켓몬 마스터가 되기 위해 도감을 완성시키도록 하여라. 일단 네가 현재 가지고 있는 포켓몬 도감에서 포켓몬의 이름을 보면 포켓몬의 번호를 말하거나, 포켓몬의 번호를 보면 포켓몬의 이름을 말하는 연습을 하도록 하여라. 나의 시험을 통과하면, 내가 새로 만든 도감을 주도록 하겠네.

입력>
첫째 줄에는 도감에 수록되어 있는 포켓몬의 개수 N이랑 내가 맞춰야 하는 문제의 개수 M이 주어져. (1 <= N, M <= 100,000)

둘째 줄부터 N개의 줄에 포켓몬의 번호가 1번인 포켓몬부터 N번에 해당하는 포켓몬까지 한 줄에 하나씩 입력으로 들어와. 포켓몬의 이름은 모두 영어로만 이루어져있고, ... , 이름의 최대 길이는 20, 최소 길이는 2야. 

그 다음 줄부터 총 M개의 줄에 내가 맞춰야하는 문제가 입력으로 들어와. 
문제가 알파벳으로만 들어오면 포켓몬 번호를 말해야 하고, 
숫자로만 들어오면, 포켓몬 번호에 해당하는 문자를 출력해야해. 입력으로 들어오는 숫자는 반드시 1보다 크거나 같고, N보다 작거나 같고, 입력으로 들어오는 문자는 반드시 도감에 있는 포켓몬의 이름만 주어져. 그럼 화이팅!!!

출력>
첫째 줄부터 차례대로 M개의 줄에 각각의 문제에 대한 답을 말해줬으면 좋겠어!!!. 입력으로 숫자가 들어왔다면 그 숫자에 해당하는 포켓몬의 이름을, 문자가 들어왔으면 그 포켓몬의 이름에 해당하는 번호를 출력하면 돼. 그럼 땡큐~

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// console.time(`-----\n`);
// 실행시간 측정 시작

// 입력값 파싱
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'example.txt')
  .toString()
  .trim()
  .split(/\r?\n/);
const [N, M] = input.shift().split(' ').map(Number);
// console.log(N, M, input);

// 문제 로직
// 포켓몬 도감 만들기
const numToName = new Map();
const nameToNum = new Map();
for (let i = 0; i < N; i++) {
  const tmp = input[i];
  numToName.set(i + 1, tmp);
  nameToNum.set(tmp, i + 1);
}
// console.log('numToName', numToName);
// console.log('nameToNum', nameToNum);
// console.log(input);

// 퀴즈 답 출력하기
const result = [];
const quiz = input.slice(N);
// console.log(quiz);
quiz.forEach((i) => {
  if (isNaN(i)) {
    result.push(nameToNum.get(i));
  } else {
    result.push(numToName.get(Number(i)));
  }
});
console.log(result.join('\n'));

// 실행시간 측정 종료
// console.timeEnd(`-----\n`);

/**
 * 문자열 / 숫자 구별 :
 1. 
 Number(i) 에서 i 가 문자열이면 'NaN' => false
 Number(0) 은 0 => 정수이지만 조건식으로 들어오면 false 되므로
 이 문제에서는 무조건 1 이상의 자연수가 들어오니까 괜찮지만...
 2.
 isNaN(i) 이 범용적인 문자열/숫자 구분 조건식으로 더 적합하겠다.

 * 시간 초과
 :  도감 만들때, input 배열에 퀴즈만 남기기 위해서 input.shift()로 꺼내 쓰면, index 수정 때문인지 시간초과가 난다. (약 22ms)
 => 그냥 도감은 input[i] 로 만들고
 퀴즈 배열을 한번의 slice() 로 추출하는 것이 시간 상 유리하다. (약 8ms)
 */
