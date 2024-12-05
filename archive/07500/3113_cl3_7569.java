import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

// https://www.acmicpc.net/problem/7569
/*
토마토

온라인 IDE 
https://www.mycompiler.io/ko/new/java

 백준 제출 시 class명 : Main
*/

class Location {
  int l;
  int r;
  int c;

  Location(int l, int r, int c){
    this.l = l;
    this.r = r;
    this.c = c;
  }
} // class Location

class Main {
  static int R; // 세로 행
  static int C; // 가로 열
  static int L; // 높이 층

  // 상하, 좌우, 층 위아래 6방향
  static int[] dr = { 1, -1, 0, 0, 0, 0 } ;
  static int[] dc = { 0, 0, 1, -1, 0, 0 } ;
  static int[] dl = { 0, 0, 0, 0, 1, -1 };
  
  static int[][][] box;
  static Queue<Location> queue;

  public static void main(String[] args) throws IOException {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      StringTokenizer st = new StringTokenizer(br.readLine());
      C = Integer.parseInt(st.nextToken());
      R = Integer.parseInt(st.nextToken());
      L = Integer.parseInt(st.nextToken());

      box = new int[L][R][C];
      queue = new LinkedList<>(); // 숙성 처리할 토마토 큐

      // 초기 토마토 위치 & 상태값 입력
      for ( int l = 0; l < L; l++ ) {
        for ( int r = 0; r < R; r++ ) {
          st = new StringTokenizer(br.readLine());
          for ( int c = 0; c < C; c++ ) {
            box[l][r][c] = Integer.parseInt(st.nextToken());
            if ( box[l][r][c] == 1 ) {
              queue.add(new Location(l,r,c));
            }
          }
        }
      }

      bfs(); // 익은 토마토 6방향으로 숙성 전파
      int result = checkRipingDays(); // 전체 숙성하는데 걸린 일수 확인
      System.out.println(result); // 결과 출력

  } // main()

  // 익은 토마토 6방향으로 숙성 전파
  static void bfs(){
    while ( !queue.isEmpty() ) {
      Location tom = queue.poll();
      int cl = tom.l;
      int cr = tom.r;
      int cc = tom.c;

      for ( int i = 0; i < 6; i++ ) {
        int nl = cl + dl[i];
        int nr = cr + dr[i];
        int nc = cc + dc[i];

        if ( nl < 0 || nr < 0 || nc < 0 || nl >= L || nr >= R || nc >= C ) continue;
        if ( box[nl][nr][nc] == 0 ) {
          queue.add(new Location(nl,nr,nc));
          box[nl][nr][nc] = box[cl][cr][cc] + 1;
        }
      }
    }
  } // bfs()

  // 전체 숙성하는데 걸린 일수 확인
  static int checkRipingDays(){
    int days = 0;

    for ( int l = 0; l < L; l++ ) {
      for ( int r = 0; r < R; r++ ) {
        for ( int c = 0; c < C; c++ ) {
          if ( box[l][r][c] == 0 ) {
            return -1; // 안 익은 토마토 남아있으면 -1 반환
          }
          days = Math.max(days, box[l][r][c]);
        }
      }
    }

    return days - 1; // 첫날 카운트 보정
  } // checkRipingDays()

}
