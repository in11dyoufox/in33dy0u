import { useEffect, useRef, useState } from "react"
import WireTerrain from "./components/WireTerrain"
import { pageTitle, home, letter, memories, end } from "./letter-text"
import { design } from "./design"

const { font, text, panel, menu, music, terrain } = design

// 음악 버튼 네온 스타일
const neonCss = `
.neonWrap {
    position: relative;
    display: inline-block;
    pointer-events: auto;
}

.neonBtn {
    position: relative;
    z-index: 1;
    color: color-mix(in srgb, var(--neon-light) 80%, transparent);
    background: rgba(0, 0, 0, 0.55);
    border: 1px solid color-mix(in srgb, var(--neon) 55%, transparent);
    box-shadow: 0 0 10px color-mix(in srgb, var(--neon) 10%, transparent);
    transition: color .5s ease, border-color .5s ease, box-shadow .5s ease;
}

.neonBtn:hover {
    border-color: color-mix(in srgb, var(--neon) 85%, transparent);
}

.neonBtn.on {
    color: var(--neon-light);
    animation:
        neonBeat 2.6s cubic-bezier(.45, .05, .35, 1) infinite,
        neonGlow 3.7s ease-in-out infinite,
        neonEdge 5.3s ease-in-out infinite,
        neonText 4.3s ease-in-out infinite;
}

@keyframes neonBeat {
    0%, 100% { transform: scale(1); }
    40% { transform: scale(1.04); }
    62% { transform: scale(1.012); }
}

@keyframes neonGlow {
    0%, 100% {
        box-shadow:
            0 0 4px 0 color-mix(in srgb, var(--neon) 55%, transparent),
            0 0 12px 1px color-mix(in srgb, var(--neon) 35%, transparent),
            0 0 28px 4px color-mix(in srgb, var(--neon) 18%, transparent),
            0 0 56px 10px color-mix(in srgb, var(--neon) 8%, transparent),
            inset 0 0 8px color-mix(in srgb, var(--neon) 18%, transparent);
    }

    50% {
        box-shadow:
            0 0 6px 1px color-mix(in srgb, var(--neon-light) 85%, transparent),
            0 0 18px 3px color-mix(in srgb, var(--neon) 55%, transparent),
            0 0 40px 8px color-mix(in srgb, var(--neon) 30%, transparent),
            0 0 80px 16px color-mix(in srgb, var(--neon) 14%, transparent),
            inset 0 0 14px color-mix(in srgb, var(--neon-light) 30%, transparent);
    }
}

@keyframes neonEdge {
    0%, 100% {
        border-color: color-mix(in srgb, var(--neon) 65%, transparent);
    }

    50% {
        border-color: var(--neon-light);
    }
}

@keyframes neonText {
    0%, 100% {
        text-shadow: 0 0 4px color-mix(in srgb, var(--neon) 40%, transparent);
    }

    50% {
        text-shadow: 0 0 9px color-mix(in srgb, var(--neon-light) 75%, transparent);
    }
}

.neonRing {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(
        closest-side,
        transparent 58%,
        color-mix(in srgb, var(--neon) 26%, transparent) 82%,
        transparent 100%
    );
    animation: neonRing 5.6s ease-out infinite;
}

.neonRing.b {
    animation-duration: 7.4s;
    animation-delay: -3.1s;
}

@keyframes neonRing {
    0% {
        transform: scale(1);
        opacity: 0;
    }

    12% {
        opacity: .9;
    }

    100% {
        transform: scale(2.5);
        opacity: 0;
    }
}
`

const headingStyle = {
    fontFamily: font.heading.family,
    fontWeight: font.heading.weight,
}

// 모든 화면에서 사용하는 어두운 영역
const panelBox = {
    pointerEvents: "auto",
    boxSizing: "border-box",
    padding: `${panel.paddingY}px ${panel.paddingX}px`,
    background: panel.background,
}

// 화면 가운데에 놓는 페이지
const centerPage = {
    minHeight: "100vh",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "96px 24px 64px",
    pointerEvents: "none",
}

function MemoryCard({ item }) {
    const m = design.memories
    const [failed, setFailed] = useState(false)
    const showPhoto = item.photo && !failed

    return (
        <figure style={{ margin: 0 }}>
            <div
                style={{
                    aspectRatio: m.photoRatio,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: showPhoto ? "none" : m.emptyBorder,
                    background: "rgba(255, 255, 255, 0.05)",
                }}
            >
                {showPhoto ? (
                    <img
                        src={`${import.meta.env.BASE_URL}${item.photo}`}
                        alt=""
                        onError={() => setFailed(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                ) : (
                    <span style={{ opacity: 0.5, fontSize: 14 }}>
                        {m.emptyLabel}
                    </span>
                )}
            </div>

            <figcaption
                style={{
                    marginTop: m.captionGap,
                    fontSize: m.captionSize,
                    textAlign: m.captionAlign,
                    whiteSpace: "pre-wrap",
                }}
            >
                {item.caption}
            </figcaption>
        </figure>
    )
}

export default function App() {
    const audioRef = useRef(null)
    const [page, setPage] = useState("home")
    const [playing, setPlaying] = useState(false)
    const [missing, setMissing] = useState(false)

    useEffect(() => {
        document.title = pageTitle

        const links = font.importUrls.map((url) => {
            const link = document.createElement("link")
            link.rel = "stylesheet"
            link.href = url
            document.head.appendChild(link)
            return link
        })

        if (audioRef.current) {
            audioRef.current.volume = music.volume
        }

        return () => links.forEach((l) => l.remove())
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    const toggleMusic = () => {
        const a = audioRef.current

        if (!a || missing) return

        if (a.paused) {
            a.play()
                .then(() => setPlaying(true))
                .catch(() => setMissing(true))
        } else {
            a.pause()
            setPlaying(false)
        }
    }

    const musicLabel = missing
        ? music.missingLabel
        : playing
            ? music.pauseLabel
            : music.playLabel

    return (
        <div
            style={{
                fontFamily: font.body.family,
                fontWeight: font.body.weight,
                color: text.color,
                wordBreak: "keep-all",
            }}
        >
            <style>
                {`
                    @keyframes pageFade {
                        from { opacity: 0 }
                        to { opacity: 1 }
                    }

                    /* HOME 제목 강력한 네온 글로우 */
                    @keyframes titleGlow {
                        0%, 100% {
                            text-shadow:
                                0 0 5px rgba(255, 106, 0, 0.8),
                                0 0 12px rgba(255, 106, 0, 0.75),
                                0 0 25px rgba(255, 106, 0, 0.65),
                                0 0 45px rgba(255, 106, 0, 0.5),
                                0 0 75px rgba(255, 60, 0, 0.4),
                                0 0 150px rgba(255, 60, 0, 0.25);
                        }

                        50% {
                            text-shadow:
                                0 0 7px rgba(255, 180, 110, 1),
                                0 0 16px rgba(255, 138, 61, 1),
                                0 0 32px rgba(255, 106, 0, 0.95),
                                0 0 60px rgba(255, 106, 0, 0.85),
                                0 0 100px rgba(255, 60, 0, 0.65),
                                0 0 150px rgba(255, 60, 0, 0.4);
                        }
                    }
                `}
                {neonCss}
            </style>

            {/* 배경 */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: 0,
                    pointerEvents: "auto",
                }}
            >
                <WireTerrain {...terrain} />
            </div>

            {/* 음악 */}
            <audio
                ref={audioRef}
                src={`${import.meta.env.BASE_URL}${music.file}`}
                loop={music.loop}
                preload="auto"
                onError={() => setMissing(true)}
                onEnded={() => setPlaying(false)}
            />

            {/* 메뉴 */}
            <nav
                style={{
                    position: "fixed",
                    top: menu.top,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    display: "flex",
                    justifyContent: "center",
                    gap: menu.gap,
                    pointerEvents: "none",
                }}
            >
                {menu.items.map((it) => {
                    const active = page === it.id

                    return (
                        <button
                            key={it.id}
                            onClick={() => setPage(it.id)}
                            style={{
                                pointerEvents: "auto",
                                padding: "6px 2px",
                                background: "none",
                                border: "none",
                                borderBottom: `1px solid ${
                                    active
                                        ? terrain.accent
                                        : "transparent"
                                }`,
                                color: text.color,
                                opacity: active ? 1 : 0.6,
                                fontFamily: font.body.family,
                                fontWeight:
                                    font.body.weight === 300
                                        ? 400
                                        : font.body.weight,
                                fontSize: menu.fontSize,
                                letterSpacing: `${menu.letterSpacing}em`,
                                cursor: "pointer",
                            }}
                        >
                            {it.label}
                        </button>
                    )
                })}
            </nav>

            {/* 현재 페이지 */}
            <div
                key={page}
                style={{
                    position: "relative",
                    zIndex: 1,
                    animation: `pageFade ${design.transition.duration}s ease`,
                    pointerEvents: "none",
                }}
            >
                {/* HOME */}
                {page === "home" && (
                    <div
                        style={{
                            ...centerPage,
                            textAlign: "center",
                        }}
                    >
                        <h1
                            style={{
                                ...headingStyle,
                                fontFamily: font.homeTitle.family,
                                fontWeight: font.homeTitle.weight,
                                margin: 0,
                                fontSize: design.home.titleSize,
                                textShadow: design.home.textShadow,
                                animation:
                                    "titleGlow 2.8s ease-in-out infinite",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {home.title}
                        </h1>

                        {home.subtitle && (
                            <p
                                style={{
                                    margin: `${design.home.subtitleGap}px 0 0`,
                                    fontSize: design.home.subtitleSize,
                                    textShadow: design.home.textShadow,
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {home.subtitle}
                            </p>
                        )}

                        <span
                            className="neonWrap"
                            style={{
                                marginTop: design.home.musicGap,
                                "--neon": music.neon.main,
                                "--neon-light": music.neon.light,
                            }}
                        >
                            {playing && <span className="neonRing" />}
                            {playing && <span className="neonRing b" />}

                            <button
                                className={
                                    playing
                                        ? "neonBtn on"
                                        : "neonBtn"
                                }
                                onClick={toggleMusic}
                                style={{
                                    padding: "10px 18px",
                                    fontFamily: font.body.family,
                                    fontWeight:
                                        font.body.weight === 300
                                            ? 400
                                            : font.body.weight,
                                    fontSize: music.fontSize,
                                    cursor: missing
                                        ? "default"
                                        : "pointer",
                                }}
                            >
                                {musicLabel}
                            </button>
                        </span>
                    </div>
                )}

                {/* LETTER */}
                {page === "letter" && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: `${panel.marginTop}px 0 ${panel.marginBottom}px`,
                            pointerEvents: "none",
                        }}
                    >
                        <article
                            style={{
                                ...panelBox,
                                width: panel.width + panel.paddingX * 2,
                                fontSize: text.fontSize,
                                lineHeight: text.lineHeight,
                                letterSpacing: `${text.letterSpacing}em`,
                            }}
                        >
                            <p
                                style={{
                                    ...headingStyle,
                                    margin: 0,
                                    fontSize: text.greetingSize,
                                }}
                            >
                                {letter.greeting}
                            </p>

                            <div
                                style={{
                                    marginTop: `${text.greetingGap}em`,
                                }}
                            >
                                {letter.paragraphs.map((p, i) => (
                                    <p
                                        key={i}
                                        style={{
                                            margin:
                                                i === 0
                                                    ? 0
                                                    : `${text.paragraphGap}em 0 0`,
                                            whiteSpace: "pre-wrap",
                                            textIndent: `${text.textIndent}em`,
                                        }}
                                    >
                                        {p}
                                    </p>
                                ))}
                            </div>

                            <p
                                style={{
                                    ...headingStyle,
                                    margin: `${text.closingGap}em 0 0`,
                                    fontSize: text.closingSize,
                                    textAlign: text.closingAlign,
                                }}
                            >
                                {letter.closing}
                            </p>
                        </article>
                    </div>
                )}

                {/* MEMORIES */}
                {page === "memories" && (
                    <div
                        style={{
                            ...centerPage,
                            pointerEvents: "none",
                        }}
                    >
                        <div
                            style={{
                                ...panelBox,
                                width:
                                    design.memories.width +
                                    panel.paddingX * 2,
                                maxWidth: "100%",
                            }}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: `repeat(${design.memories.columns}, 1fr)`,
                                    gap: design.memories.gap,
                                }}
                            >
                                {memories.map((item, i) => (
                                    <MemoryCard
                                        key={i}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* END */}
                {page === "end" && (
                    <div style={centerPage}>
                        <div
                            style={{
                                ...panelBox,
                                maxWidth:
                                    design.end.maxWidth +
                                    panel.paddingX * 2,
                                textAlign: "center",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        ...headingStyle,
                                        fontFamily:
                                            font.homeTitle.family,
                                        margin: 0,
                                        fontSize:
                                            design.end.messageSize,
                                        lineHeight:
                                            design.end.lineHeight,
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    {end.message}
                                </p>

                                <p
                                    style={{
                                        ...headingStyle,
                                        margin: "48px 0 0",
                                        fontSize:
                                            design.end.messageSize,
                                        lineHeight:
                                            design.end.lineHeight,
                                        textAlign: "center",
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    {end.giftCode}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
