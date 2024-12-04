// https://www.acmicpc.net/problem/1043
/*
거짓말

지민이는 파티에 가서 이야기 하는 것을 좋아한다. 파티에 갈 때마다, 지민이는 지민이가 가장 좋아하는 이야기를 한다. 지민이는 그 이야기를 말할 때, 있는 그대로 진실로 말하거나 엄청나게 과장해서 말한다. 당연히 과장해서 이야기하는 것이 훨씬 더 재미있기 때문에, 되도록이면 과장해서 이야기하려고 한다. 하지만, 지민이는 거짓말쟁이로 알려지기는 싫어한다. 문제는 몇몇 사람들은 그 이야기의 진실을 안다는 것이다. 따라서 이런 사람들이 파티에 왔을 때는, 지민이는 진실을 이야기할 수 밖에 없다. 당연히, 어떤 사람이 어떤 파티에서는 진실을 듣고, 또다른 파티에서는 과장된 이야기를 들었을 때도 지민이는 거짓말쟁이로 알려지게 된다. 지민이는 이런 일을 모두 피해야 한다.

사람의 수 N이 주어진다. 그리고 그 이야기의 진실을 아는 사람이 주어진다. 그리고 각 파티에 오는 사람들의 번호가 주어진다. 지민이는 모든 파티에 참가해야 한다. 이때, 지민이가 거짓말쟁이로 알려지지 않으면서, 과장된 이야기를 할 수 있는 파티 개수의 최댓값을 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs')
  .readFileSync(path)
  .toString()
  .trim()
  .split(/\r?\n/)
  .map((i) => i.split(' ').map(Number));
const [N, M] = input.shift();
const [knowerN, ...knowerMem] = input.shift();
const party = input.map((i) => i.slice(1));
// console.log(N, M, '\n', knowerN, knowerMem, '\n', party);

// 문제 로직
/**
 * 유니온 파인드 : 
진실을 알고 있는 사람을 하나의 집합으로 여긴 뒤, 
그들과 같은 파티에 참석한 사람들도 해당 집합원으로 통합.

1. 파티에서 만날 사람들을 2차원 배열로 연결한 뒤
2. 진실을 알게 될 사람들 추려내고
3. 각 파티 순회하며 진실 아는 사람이 없을 경우에만 카운트 업.

 * JS 배열의 .some() 함수 : 배열 요소 중 하나라도 해당하면 true
 * JS 배열의 .every() 함수 : 배열 요소 전부가 해당하면 true
 */

// 만약 진실을 아는 사람이 한명도 없으면 모든 파티에서 거짓말 가능, 끝.
if (knowerN === 0) {
  console.log(M);
  return;
}

// 파티에서 만나는 사람들 2차원 배열로 연결하기
const connect = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));
for (const guests of party) {
  for (let i = 0; i < guests.length - 1; i++) {
    for (let j = i + 1; j < guests.length; j++) {
      const [a, b] = [guests[i], guests[j]];
      connect[a][b] = 1;
      connect[b][a] = 1;
    }
  }
}
// console.log(group.map((i) => i.join(' ')).join('\n'));

// 진실 알게 될 사람들 추려내기
const knowerSet = new Set(knowerMem);
const visited = Array(N + 1).fill(false);
const stack = [...knowerMem];
knowerMem.forEach((i) => (visited[i] = true));

while (stack.length) {
  const cur = stack.pop();
  for (let i = 1; i <= N; i++) {
    if (connect[cur][i] && !visited[i]) {
      visited[i] = true;
      stack.push(i);
      knowerSet.add(i);
    }
  }
}
// console.log(knowerSet);

// 진실 아는 사람 포함 여부 판별
function isIncludeKnowingPeople(guests) {
  return guests.some((el) => knowerSet.has(el));
}

// 파티 순회하며 진실 아는 사람 없으면 카운트 업
let cnt = 0;
for (const guests of party) {
  if (!isIncludeKnowingPeople(guests)) cnt++;
}
console.log(cnt); // 결과 출력
