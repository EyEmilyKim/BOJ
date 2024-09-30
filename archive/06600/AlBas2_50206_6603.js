// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const input = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
input.pop();
const test = input.map((i) => {
  [k, ...nums] = i.split(' ').map(Number);
  return [k, nums];
});
// console.log(test);

// 문제 로직
/**
 * 백 트래킹. 오름차순. 배열 제시. 자릿수 지정.
 */

const result = [];
function testX(N, arr) {
  const output = [];
  const numSet = [];
  const visited = new Array(N).fill(false);

  const recursive = (depth) => {
    // 로또 6자리 완성하면 이 조합 끝
    if (depth === 6) {
      output.push(numSet.join(' '));
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      // 오름차순이 깨지면 다음 수(depth 가 아니고 arr) 로 넘어감
      if (depth >= 1 && arr[i] < numSet[depth - 1]) continue;
      visited[i] = true;
      numSet.push(arr[i]);
      recursive(depth + 1);
      numSet.pop();
      visited[i] = false;
    }
  };

  recursive(0);
  result.push(output.join('\n'));
}

// 작업 수행
for (let t of test) {
  const N = t[0];
  const arr = t[1].sort((a, b) => a - b);
  testX(N, arr);
}
console.log(result.join('\n\n'));
