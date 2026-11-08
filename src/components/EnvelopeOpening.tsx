import { useEffect, useMemo, useState, type CSSProperties } from "react";

/* ---------- Watercolour eucalyptus branch (pure SVG) ---------- */
const LEAF_COLORS = ["#5f7a45", "#7d9563", "#94aa7a", "#4f6b3a", "#a9bb92", "#6d8752"];

function EucalyptusBranch({
  length = 260,
  leaves = 14,
  curve = 40,
  seed = 1,
  className,
  style,
}: {
  length?: number;
  leaves?: number;
  curve?: number;
  seed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const items = useMemo(() => {
    let s = seed * 9301;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const out: { x: number; y: number; r: number; rot: number; c: string; o: number }[] = [];
    for (let i = 0; i < leaves; i++) {
      const t = (i + 1) / (leaves + 1);
      // point on quadratic curve from (0,0) to (length,0), control (length/2, curve*2)
      const x = length * t;
      const y = 2 * (1 - t) * t * curve * 2 * 0.5;
      const side = i % 2 === 0 ? -1 : 1;
      const r = 9 + (1 - t) * 9 + rand() * 4;
      out.push({
        x,
        y: y + side * (r * 0.9),
        r,
        rot: rand() * 50 - 25,
        c: LEAF_COLORS[Math.floor(rand() * LEAF_COLORS.length)],
        o: 0.55 + rand() * 0.35,
      });
    }
    return out;
  }, [length, leaves, curve, seed]);

  const minY = Math.min(0, curve) - 30;
  const h = Math.abs(curve) + 60;

  return (
    <svg viewBox={`-25 ${minY} ${length + 50} ${h}`} className={className} style={style} aria-hidden="true">
      <path
        d={`M0 0 Q ${length / 2} ${curve} ${length} 0`}
        stroke="#6b5a3a"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        fill="none"
      />
      {items.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <ellipse rx={l.r} ry={l.r * 0.82} fill={l.c} opacity={l.o} />
          <ellipse rx={l.r * 0.6} ry={l.r * 0.45} cx={-l.r * 0.2} cy={-l.r * 0.2} fill="#ffffff" opacity="0.12" />
        </g>
      ))}
    </svg>
  );
}

function HeartDivider() {
  return (
    <div className="c-heart">
      <span />
      <svg viewBox="0 0 24 22" aria-hidden="true">
        <path
          d="M12 21s-9-6.1-9-12.2C3 5 5.6 2.5 8.6 2.5c1.6 0 2.7.7 3.4 1.8.7-1.1 1.8-1.8 3.4-1.8 3 0 5.6 2.5 5.6 6.3C21 14.9 12 21 12 21z"
          fill="currentColor"
        />
      </svg>
      <span />
    </div>
  );
}

/* ---------- Invitation card content ---------- */
function CardContent() {
  return (
    <div className="card-inner">
      <p className="c-title">Wedding Invitation</p>
      <HeartDivider />
      <h2 className="c-names c-names-big">
        <span>Chrishal</span>
        <span className="c-amp">&amp;</span>
        <span>Chathurika</span>
      </h2>
    </div>
  );
}

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void; onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      const timer = setTimeout(() => onComplete(), 5000); // ~2s reveal animation + 3s on the card
      return () => clearTimeout(timer);
    }
  }, [opened, onComplete, onMusicStart]);

  const open = () => {
    if (!opened) setOpened(true);
  };

  return (
    <>
      <style>{`
        .eo-shell {
          --olive-900: #3b4a24;
          --olive-700: #4a5d23;
          --olive-500: #6b7f3a;
          --olive-300: #a3b18a;
          --cream: #f7f6ef;
          min-height: 100svh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          padding: 24px 16px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(ellipse at 20% 10%, rgba(163,177,138,0.28), transparent 55%),
            radial-gradient(ellipse at 85% 90%, rgba(107,127,58,0.22), transparent 55%),
            linear-gradient(160deg, #eef0e4, var(--cream) 50%, #e7eadb);
          font-family: "Cormorant Garamond", serif;
        }
        .eo-bg-leaf { position: absolute; width: 380px; opacity: 0.35; pointer-events: none; }
        .eo-bg-leaf.l1 { top: 10px; left: -110px; transform: rotate(35deg); }
        .eo-bg-leaf.l2 { bottom: 10px; right: -110px; transform: rotate(-150deg); }

        .eo-stage {
          position: relative;
          width: min(88vw, 430px, 62svh);
          aspect-ratio: 1143 / 1600;
          cursor: pointer;
          outline: none;
          container-type: inline-size;
          transition: transform 1.2s cubic-bezier(.2,.8,.2,1);
        }
        .eo-stage:focus-visible { box-shadow: 0 0 0 3px var(--olive-300); border-radius: 6px; }
        .eo-stage:not(.is-open):hover { transform: translateY(-4px) rotate(-0.4deg); }
        .eo-stage.is-open { transform: scale(1.02); cursor: default; }

        /* ----- Card ----- */
        .eo-card {
          position: absolute; inset: 0;
          background: #fbfaf5 url("/Gemini_Generated_Image_iiyw5riiyw5riiyw.jpg") center / cover no-repeat;
          border-radius: 4px;
          overflow: hidden;
          container-type: inline-size;
          box-shadow: 0 30px 60px -20px rgba(59,74,36,0.35), 0 8px 18px rgba(0,0,0,0.08);
        }
        .greenery { position: absolute; pointer-events: none; width: 62%; height: 45%; }
        .greenery-tl { top: -6%; left: -12%; }
        .greenery-br { bottom: -6%; right: -12%; transform: rotate(180deg); }
        .greenery .branch { position: absolute; width: 100%; }
        .greenery .b1 { top: 0; left: 0; transform: rotate(14deg); transform-origin: 0 0; }
        .greenery .b2 { top: 4%; left: 6%; transform: rotate(68deg); transform-origin: 0 0; width: 80%; }
        .greenery .b3 { top: 0; left: 14%; transform: rotate(-4deg); transform-origin: 0 0; width: 70%; }

        .card-inner {
          position: relative; z-index: 1;
          height: 100%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 9cqw 11cqw 7cqw;
          box-sizing: border-box;
          color: #3d3d36;
        }
        .card-inner p { margin: 0; }
        .c-verse { font-style: italic; color: var(--olive-700); font-size: 4cqw; line-height: 1.25; font-weight: 600; margin-bottom: 3cqw !important; }
        .c-parents { display: flex; align-items: stretch; justify-content: center; gap: 3cqw; font-size: 2.85cqw; line-height: 1.35; font-weight: 600; color: #4a4a40; }
        .c-parents p { flex: 1; }
        .c-vline { width: 1px; background: var(--olive-500); opacity: 0.7; }
        .c-names { font-family: "Great Vibes", cursive; font-weight: 400; color: var(--olive-700); font-size: 9.6cqw; line-height: 1.1; margin: 2.4cqw 0 0.5cqw; white-space: nowrap; }
        .c-title { font-family: "Cinzel", serif; font-weight: 700; color: var(--olive-700); font-size: 5.6cqw; letter-spacing: 0.22em; text-transform: uppercase; line-height: 1.4; }
        .c-names-big { display: flex; flex-direction: column; align-items: center; font-size: 17cqw; line-height: 1.05; margin-top: 3cqw; }
        .c-names-big .c-amp { font-size: 0.6em; margin: 1cqw 0; }
        .c-amp { color: var(--olive-500); font-size: 0.8em; margin: 0 0.15em; }
        .c-rule { width: 78%; height: 1px; background: #3d3d36; opacity: 0.6; margin-bottom: 2.4cqw; }
        .c-text { font-size: 3.3cqw; line-height: 1.3; font-weight: 500; }
        .c-guest { margin: 1cqw 0 !important; letter-spacing: 0.02em; }
        .c-date { font-family: "Cinzel", serif; font-weight: 700; color: var(--olive-700); font-size: 5.4cqw; letter-spacing: 0.06em; margin-bottom: 1.8cqw !important; }
        .c-time { font-weight: 700; font-size: 3.8cqw; color: #2f2f28; }
        .c-place { font-weight: 700; font-size: 3.4cqw; color: #2f2f28; }
        .c-heart { display: flex; align-items: center; justify-content: center; gap: 1.6cqw; width: 70%; margin: 2.2cqw 0; color: var(--olive-500); }
        .c-heart span { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--olive-500)); }
        .c-heart span:last-child { background: linear-gradient(90deg, var(--olive-500), transparent); }
        .c-heart svg { width: 3.4cqw; height: 3.4cqw; }
        .c-rsvp { position: absolute; left: 6cqw; bottom: 4.5cqw; text-align: center; font-family: "Cinzel", serif; font-weight: 700; font-size: 2.3cqw; letter-spacing: 0.08em; line-height: 1.5; color: #2f2f28; }

        /* ----- Vellum wrap ----- */
        .eo-vellum {
          position: absolute; top: -1.5%; bottom: -1.5%;
          background: linear-gradient(180deg, rgba(255,255,255,0.62), rgba(250,251,246,0.5));
          backdrop-filter: blur(2.4px) saturate(0.85);
          -webkit-backdrop-filter: blur(2.4px) saturate(0.85);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.65), 0 6px 18px rgba(59,74,36,0.12);
          transition: transform 1.4s cubic-bezier(.65,0,.35,1) .55s, opacity 1.2s ease .75s;
          z-index: 3;
        }
        .eo-vellum.left { left: -1.5%; width: 51.5%; border-radius: 3px 0 0 3px; }
        .eo-vellum.right {
          right: -1.5%; width: 52.5%; border-radius: 0 3px 3px 0;
          box-shadow: inset 1px 0 0 rgba(255,255,255,0.9), -3px 0 8px rgba(59,74,36,0.1), inset 0 0 0 1px rgba(255,255,255,0.65);
        }
        .is-open .eo-vellum.left { transform: translateX(-105%) rotateY(25deg); opacity: 0; }
        .is-open .eo-vellum.right { transform: translateX(105%) rotateY(-25deg); opacity: 0; }

        /* ----- Twine ----- */
        .eo-twine { position: absolute; left: -3%; right: -3%; top: 50%; height: 14px; z-index: 4; transition: opacity .6s ease .25s, transform .8s ease .2s; }
        .eo-twine i {
          position: absolute; left: 0; right: 0; height: 4px; border-radius: 3px;
          background: repeating-linear-gradient(115deg, #c9a874 0 3px, #9c7b49 3px 5px, #dcc193 5px 7px);
          box-shadow: 0 1px 2px rgba(60,40,10,0.35);
        }
        .eo-twine i:nth-child(1) { top: 3px; transform: rotate(-0.6deg); }
        .eo-twine i:nth-child(2) { top: 8px; transform: rotate(0.4deg); }
        .is-open .eo-twine { opacity: 0; transform: translateY(30px) scaleX(1.1); }

        /* ----- Seal & flowers ----- */
        .eo-seal-wrap {
          position: absolute; left: 50%; top: 50%; z-index: 5;
          width: 50%; aspect-ratio: 1;
          transform: translate(-50%, -69%);
          transition: transform .9s cubic-bezier(.5,-0.3,.6,1), opacity .7s ease .2s;
        }
        .is-open .eo-seal-wrap { transform: translate(-50%, 60%) rotate(-25deg); opacity: 0; }
        .eo-seal-img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 6px 10px rgba(40,30,5,0.35)); user-select: none; pointer-events: none; }
        .babys-breath { position: absolute; width: 120%; left: -10%; top: -78%; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.15)); }
        .eo-seal {
          position: absolute; inset: 0;
          border-radius: 48% 52% 50% 50% / 51% 47% 53% 49%;
          background: radial-gradient(circle at 34% 28%, #efd98a 0%, #c9a640 22%, #9e7f26 55%, #6f5714 100%);
          box-shadow:
            inset -4px -6px 10px rgba(60,44,6,0.55),
            inset 4px 5px 8px rgba(255,240,180,0.55),
            0 6px 14px rgba(40,30,5,0.45);
          display: flex; align-items: center; justify-content: center;
        }
        .eo-seal::before {
          content: ""; position: absolute; inset: 14%;
          border-radius: 50%;
          border: 2px solid rgba(90,68,10,0.55);
          box-shadow: inset 0 0 0 1px rgba(255,236,170,0.35), 0 0 0 1px rgba(255,236,170,0.25);
        }
        .eo-seal span {
          position: relative;
          font-family: "Great Vibes", cursive; font-size: 10cqw;
          color: #6b5312;
          text-shadow: 1px 1px 0 rgba(255,236,170,0.55), -1px -1px 0 rgba(60,44,6,0.45);
          letter-spacing: -0.04em;
        }

        .eo-hint {
          font-family: "Cinzel", serif; letter-spacing: 0.3em; font-size: 12px; text-transform: uppercase;
          color: var(--olive-700);
          animation: eoPulse 2.2s ease-in-out infinite;
          text-align: center;
        }
        @keyframes eoPulse { 0%,100% { opacity: .45 } 50% { opacity: 1 } }

        .eo-continue {
          font-family: "Cinzel", serif; letter-spacing: 0.22em; font-size: 12px; text-transform: uppercase;
          color: #fff; background: linear-gradient(135deg, var(--olive-500), var(--olive-900));
          border: none; border-radius: 999px; padding: 12px 26px; cursor: pointer;
          box-shadow: 0 8px 20px rgba(59,74,36,0.3);
          opacity: 0; transform: translateY(10px);
          animation: eoIn .8s ease 2.4s forwards;
        }
        @keyframes eoIn { to { opacity: 1; transform: none; } }

        @media (prefers-reduced-motion: reduce) {
          .eo-vellum, .eo-twine, .eo-seal-wrap, .eo-stage { transition-duration: .01s !important; transition-delay: 0s !important; }
          .eo-hint { animation: none; }
        }
      `}</style>

      <div className="eo-shell">
        <EucalyptusBranch className="eo-bg-leaf l1" length={300} leaves={16} curve={30} seed={21} />
        <EucalyptusBranch className="eo-bg-leaf l2" length={300} leaves={16} curve={-30} seed={29} />

        <div
          className={`eo-stage ${opened ? "is-open" : ""}`}
          role="button"
          tabIndex={opened ? -1 : 0}
          aria-label="Open invitation"
          onClick={open}
          onKeyDown={(e) => {
            if (!opened && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              open();
            }
          }}
        >
          <div className="eo-card">
            <CardContent />
          </div>

          <div className="eo-vellum left" />
          <div className="eo-vellum right" />

          <div className="eo-twine" aria-hidden="true">
            <i />
            <i />
          </div>

          <div className="eo-seal-wrap" aria-hidden="true">
            <img
              src="/Golden_Wax_Seal_with_Baby_s_Breath-removebg-preview.png"
              alt=""
              className="eo-seal-img"
              draggable={false}
            />
          </div>
        </div>

        {opened ? (
          <button className="eo-continue" onClick={onComplete}>
            View Invitation
          </button>
        ) : (
          <div className="eo-hint">Tap the seal to open</div>
        )}
      </div>
    </>
  );
}
