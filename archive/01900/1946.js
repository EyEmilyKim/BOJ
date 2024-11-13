// https://www.acmicpc.net/problem/1946
/*
신입 사원

언제나 최고만을 지향하는 굴지의 대기업 진영 주식회사가 신규 사원 채용을 실시한다. 인재 선발 시험은 1차 서류심사와 2차 면접시험으로 이루어진다. 최고만을 지향한다는 기업의 이념에 따라 그들은 최고의 인재들만을 사원으로 선발하고 싶어 한다.

그래서 진영 주식회사는, 다른 모든 지원자와 비교했을 때 서류심사 성적과 면접시험 성적 중 적어도 하나가 다른 지원자보다 떨어지지 않는 자만 선발한다는 원칙을 세웠다. 즉, 어떤 지원자 A의 성적이 다른 어떤 지원자 B의 성적에 비해 서류 심사 결과와 면접 성적이 모두 떨어진다면 A는 결코 선발되지 않는다.

이러한 조건을 만족시키면서, 진영 주식회사가 이번 신규 사원 채용에서 선발할 수 있는 신입사원의 최대 인원수를 구하는 프로그램을 작성하시오.

입력값 파일 :  'example.txt' -> 백준 제출 시 :  '/dev/stdin'
*/

// 입력값 파싱
const path = process.platform === 'linux' ? '/dev/stdin' : 'example.txt';
const [N, ...data] = require('fs').readFileSync(path).toString().trim().split(/\r?\n/);
// console.log(N, data);

// 문제 로직

// 지원자들의 서류 & 면접 석차 비교해 합격자 추리는 함수
function screenCandidates(N, arr) {
  arr = arr.sort((a, b) => a[0] - b[0]); // 일단 서류 석차 기준으로 오름차순 정렬
  // console.log(arr);
  let hired = 1; // 합격자 수 (일단 서류 1등은 무조건 합격)
  let cutLine = arr[0][1];

  for (let i = 1; i < N; i++) {
    // 서류 2등부터는 앞사람의 면접 석차보다 높아야(수가 작아야)만 통과
    if (cutLine > arr[i][1]) {
      hired += +1;
      cutLine = arr[i][1];
    }
  }
  return hired;
}

// 작업 수행
const result = [];
for (let i = 0; i < data.length; ) {
  let N = Number(data[i]);
  let arr = data.slice(i + 1, i + 1 + N).map((i) => i.split(' ').map(Number));
  result.push(screenCandidates(N, arr));
  i += N + 1;
}
console.log(result.join('\n'));
