import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

// https://www.acmicpc.net/problem/11404
/*
플로이드

온라인 IDE 
https://www.mycompiler.io/ko/new/java

 백준 제출 시 class : public Main
*/

class Main {
  
  public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    
    int N = Integer.parseInt(br.readLine());
    int M = Integer.parseInt(br.readLine());
    
    // 모든 정점 to 모든 정점 비용 배열 초기화
    final int MAX = 100_000 * 100;
    int[][] dist = new int[N+1][N+1];
    for (int[] row : dist) Arrays.fill(row, MAX);
    for (int i=1; i<=N; i++) dist[i][i] = 0;

    // 주어진 간선 데이터 입력
    while (M-- > 0) {
      StringTokenizer st = new StringTokenizer(br.readLine());
      int from = Integer.parseInt(st.nextToken());
      int to = Integer.parseInt(st.nextToken());
      int cost = Integer.parseInt(st.nextToken());
      dist[from][to] = Math.min(dist[from][to], cost);
    }

    // 직행 비용과 경유 비용 비교, 최소값 갱신
    // i: 경유지, f: 출발지, t: 도착지
    for (int i = 1; i<=N; i++) {
      for (int f = 1; f<=N; f++) {
        for (int t = 1; t<=N; t++) {
          dist[f][t] = Math.min(dist[f][t], dist[f][i] + dist[i][t]);
        }
      }
    }

    // 결과 출력
    StringBuilder sb = new StringBuilder();
    for (int f=1; f<=N; f++) {
      for (int t=1; t<=N; t++) {
        sb.append(dist[f][t] >= MAX ? 0 : dist[f][t]).append(' ');
      }
      sb.append('\n');
    }
    System.out.println(sb);
  } // main()

}

// 문제 로직
/**
 * 플로이드-워셜 : 모든 정점에서 정점까지의 최단거리 구하는 알고리즘
 * - 비용 배열 INF 로 초기화
 * - 간선의 비용 대입
 * - 경유해서 비용 줄어들 경우 갱신 (3중 for문)
 *
 * (다익스트라 : 한 점에서 모든 점까지의 최단거리 구할 때 사용)
 */