// ─────────────────────────────────────────────
//  디자인 · 음악 · 배경 설정 — 자주 바꾸는 값은 모두 여기 있습니다
// ─────────────────────────────────────────────

export const design = {
     // 글꼴
    font: {
        importUrls: [
            "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap",
            "https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css",
        ],

        // 기존 제목들
        heading: {
            family: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
            weight: 500,
        },

        // 편지 본문 / 메뉴 / 사진 글귀
        body: {
            family: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
            weight: 300,
        },

        // 첫 화면 "당신을 사랑해." 전용
        homeTitle: {
            family: '"Galmuri14", sans-serif',
            weight: 400,
        },
    },

    // 공통 글씨
   text: {
    fontSize: 15,          // 편지 본문 글자 크기(px)
    lineHeight: 1.95,      // 줄 간격(배수)
    paragraphGap: 1.3,     // 문단 사이 간격(글자 크기 배수)
    letterSpacing: 0.01,   // 글자 사이 간격(글자 크기 배수)
    textIndent: 1.5,       // 문단 첫 줄 들여쓰기(글자 크기 배수)
    color: "#F3E9E2",      // 글자색
    greetingSize: 24,      // 받는 사람 글자 크기(px)
    greetingGap: 2.4,      // 받는 사람과 본문 사이 간격(글자 크기 배수)
    closingSize: 20,       // 보내는 사람 글자 크기(px)
    closingGap: 2.8,       // 본문과 보내는 사람 사이 간격(글자 크기 배수)
    closingAlign: "right", // 보내는 사람 위치: "left" | "center" | "right"
},

    // 편지 종이(글이 올라가는 어두운 영역, 모든 화면 공통)
    panel: {
        width: 640,                        // 편지 폭(px)
        paddingY: 72,                      // 위아래 안쪽 여백(px)
        paddingX: 64,                      // 좌우 안쪽 여백(px)
        marginTop: 120,                    // 화면 위쪽 바깥 여백(px)
        marginBottom: 120,                 // 화면 아래쪽 바깥 여백(px)
        background: "rgba(0, 0, 0, 0.55)", // 배경 어둡기 (마지막 숫자 0~1, 클수록 진함)
    },

    // 화면 전환
    transition: { duration: 0.5 }, // 부드럽게 나타나는 시간(초), 0이면 즉시 전환

    // 위쪽 메뉴 (label: 화면에 보이는 이름)
    menu: {
        items: [
            { id: "home", label: "HOME" },
            { id: "letter", label: "LETTER" },
            { id: "memories", label: "MEMORIES" },
            { id: "end", label: "END" },
        ],
        top: 28,            // 위에서 떨어진 거리(px)
        gap: 40,            // 메뉴 사이 간격(px)
        fontSize: 15,       // 글자 크기(px)
        letterSpacing: 0.14, // 글자 사이 간격(글자 크기 배수)
        // 선택된 메뉴 밑줄 색은 아래 terrain.accent 색을 따라갑니다
    },

    // HOME (첫 화면)
    home: {
        titleSize: 56,       // 제목 글자 크기(px)
        subtitleSize: 20,    // 부제목 글자 크기(px)
        subtitleGap: 16,     // 제목과 부제목 사이(px)
        musicGap: 48,        // 글과 음악 버튼 사이(px)
        textShadow: "0 2px 28px rgba(0, 0, 0, 0.85)", // 글자 뒤 그림자(배경 위 가독성)
    },

    // MEMORIES (사진 + 글귀)
    memories: {
        width: 1000,             // 사진 영역 전체 폭(px)
        columns: 3,              // 한 줄에 놓을 사진 수
        gap: 32,                 // 사진 사이 간격(px)
        photoRatio: "4 / 5",     // 사진 비율 (가로 / 세로)
        captionSize: 16,         // 글귀 글자 크기(px)
        captionGap: 14,          // 사진과 글귀 사이(px)
        captionAlign: "center",  // 글귀 위치: "left" | "center" | "right"
        emptyLabel: "사진 자리", // 사진 파일이 없을 때 빈 칸에 보이는 글
        emptyBorder: "1px dashed rgba(255, 255, 255, 0.35)",
    },

    // END (마지막 메시지)
    end: {
        messageSize: 30,   // 글자 크기(px)
        lineHeight: 1.9,   // 줄 간격(배수)
        maxWidth: 640,     // 글 폭(px)
    },

    // 음악: mp3 파일을 public 폴더에 넣고, 아래 file 이름과 맞추세요
 music: {
    file: "music.mp3",
    volume: 0.6,
    loop: true,
    playLabel: "음악 재생",
    pauseLabel: "음악 일시정지",
    missingLabel: "music.mp3 파일을 찾을 수 없어요",
    fontSize: 15,
    neon: {
        main: "#FF6A00",
        light: "#FF8A3D",
    },
},

    // 배경 터레인 (원래 기본값 그대로)
    terrain: {
        background: "#000000",
        lineColor: "#B12B00",
        accent: "#FF3C00",
        density: 120,
        speed: 100,
        relief: 100,
        sunSize: 100,
        cameraHeight: 94,
        hover: 200,
    },
}
