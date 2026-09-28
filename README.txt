[내 컴퓨터에서 확인하기]
1. 이 폴더에서 터미널을 열고 아래를 입력합니다.
     npm install      (처음 한 번만)
     npm run dev
2. 나오는 주소(보통 http://localhost:5173)를 브라우저에서 엽니다.
   끄려면 터미널에서 Ctrl + C.

[내가 바꿀 곳]
- 모든 글(첫 화면, 편지, 사진 글귀, 마지막 메시지) : src/letter-text.js
- 글꼴/크기/줄간격/여백/메뉴/음악 이름/배경 설정   : src/design.js
- 음악 파일 : public 폴더에 mp3를 넣기 (기본 이름: music.mp3)
- 사진 파일 : public/memories 폴더에 넣고, letter-text.js의 photo 이름과 맞추기
