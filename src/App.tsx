import { useEffect, useRef, useState } from 'react'

const styles = `
  html, body { background: #000; cursor: default; overscroll-behavior: none; }
  * { cursor: default !important; }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes btn-appear {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 0.7; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .rev-btn { font-size: clamp(18px, 7.5vw, 38px) !important; padding: 10px 26px 9px !important; font-family: 'Big Shoulders Display', sans-serif !important; font-weight: 900 !important; backdrop-filter: blur(14px) saturate(140%) !important; -webkit-backdrop-filter: blur(14px) saturate(140%) !important; }
  }

  .fade-overlay {
    background: linear-gradient(to bottom,
      rgba(0,0,0,1)    0%,
      rgba(0,0,0,0.87) 1%,
      rgba(0,0,0,0.66) 2.2%,
      rgba(0,0,0,0.42) 3.6%,
      rgba(0,0,0,0.2)  5%,
      rgba(0,0,0,0.07) 6.2%,
      rgba(0,0,0,0)    7.5%,
      rgba(0,0,0,0)    92.5%,
      rgba(0,0,0,0.07) 93.8%,
      rgba(0,0,0,0.2)  95%,
      rgba(0,0,0,0.42) 96.4%,
      rgba(0,0,0,0.66) 97.8%,
      rgba(0,0,0,0.87) 99%,
      rgba(0,0,0,1)    100%
    );
  }

  @media (min-width: 769px) {
    .fade-overlay {
      background: linear-gradient(to bottom,
        rgba(0,0,0,1)    0%,
        rgba(0,0,0,0.87) 0.6%,
        rgba(0,0,0,0.66) 1.4%,
        rgba(0,0,0,0.42) 2.4%,
        rgba(0,0,0,0.2)  3.4%,
        rgba(0,0,0,0.07) 4.2%,
        rgba(0,0,0,0)    5%,
        rgba(0,0,0,0)    95%,
        rgba(0,0,0,0.07) 95.8%,
        rgba(0,0,0,0.2)  96.6%,
        rgba(0,0,0,0.42) 97.6%,
        rgba(0,0,0,0.66) 98.6%,
        rgba(0,0,0,0.87) 99.4%,
        rgba(0,0,0,1)    100%
      );
    }
  }

  .rev-btn-wrap { position: relative; }
  .rev-btn-wrap::before {
    content: '';
    position: absolute;
    inset: -50px -80px;
    background: radial-gradient(ellipse at center, rgba(255,255,255,0.045) 0%, transparent 65%);
    pointer-events: none;
    border-radius: 999px;
    z-index: -1;
  }

  .rev-btn:focus  { outline: none; }
  .rev-btn:hover  {
    opacity: 1 !important;
    letter-spacing: 0.52em !important;
    cursor: pointer !important;
    box-shadow:
      0 0 0 0.5px rgba(255,255,255,0.32),
      inset 0 1px 0 rgba(255,255,255,0.38),
      inset 0 -1px 0 rgba(0,0,0,0.35),
      0 20px 80px rgba(0,0,0,0.8),
      0 0 140px rgba(255,255,255,0.06) !important;
  }
  .rev-btn:active {
    opacity: 1 !important;
    letter-spacing: 0.52em !important;
  }
`

export default function App() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const [blurred, setBlurred] = useState(false)
  const isMobile = window.innerWidth <= 768

  /* scaleY mobile */
  useEffect(() => {
    if (!h1Ref.current) return
    const apply = (mobile: boolean) => {
      if (!h1Ref.current) return
      h1Ref.current.style.transform = mobile
        ? 'translateX(-6vw) translateY(3vh) scaleY(3.2)'
        : 'translateX(-6vw) translateY(3vh)'
    }
    const mq = window.matchMedia('(max-width: 768px)')
    apply(mq.matches)
    const handler = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const blurVal = isMobile ? 'blur(3px)' : 'blur(7px)'

  return (
    <>
      <style>{styles}</style>

      {/* Sentinelas para Safari 18+ amostrar preto nas barras */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px', background: '#000', zIndex: 9999, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '1px', background: '#000', zIndex: 9999, pointerEvents: 'none' }} />

      {/* Container principal — desfocável */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse 80% 60% at center, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
        filter: blurred ? blurVal : 'none',
        transform: blurred ? 'scale(1.06)' : 'scale(1)',
        transition: 'filter 0.6s ease, transform 0.6s ease',
      }}>
        {/* Paper grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.025, pointerEvents: 'none', zIndex: 1,
        }} />

        {/* OS1 */}
        <h1 ref={h1Ref} style={{
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(280px, 83vw, 1320px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.82,
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          background: 'linear-gradient(175deg, #060606 0%, #2e2e2e 50%, #060606 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          margin: 0, whiteSpace: 'nowrap',
          transform: 'translateX(-6vw) translateY(3vh)',
          userSelect: 'none', zIndex: 3, cursor: 'default',
        }}>
          <span style={{
            display: 'inline-block', position: 'relative', zIndex: 1,
            transform: 'scaleX(1.3) translateZ(0)', transformOrigin: 'center',
            background: 'linear-gradient(175deg, #060606 0%, #2e2e2e 50%, #060606 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 0px rgba(0,0,0,1)) drop-shadow(3px 0 1px rgba(0,0,0,0.55)) drop-shadow(4px 3px 6px rgba(0,0,0,0.15))',
          }}>O</span><span style={{
            display: 'inline-block', position: 'relative', zIndex: 2,
            transform: 'scaleX(1.3) translateZ(0)', transformOrigin: 'center',
            background: 'linear-gradient(175deg, #060606 0%, #2e2e2e 50%, #060606 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 0px rgba(0,0,0,1)) drop-shadow(3px 0 1px rgba(0,0,0,0.55)) drop-shadow(-5px 0 1px rgba(0,0,0,0.95)) drop-shadow(4px 3px 8px rgba(0,0,0,0.25))',
          }}>S</span><span style={{
            display: 'inline-block', position: 'relative', zIndex: 3,
            transform: 'scaleX(2.0) translateX(1%) translateY(-3%) translateZ(0)',
            transformOrigin: 'center',
            background: 'linear-gradient(175deg, #060606 0%, #2e2e2e 50%, #060606 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 0px rgba(0,0,0,1)) drop-shadow(-5px 0 1px rgba(0,0,0,0.95)) drop-shadow(5px 4px 12px rgba(0,0,0,0.35))',
          }}>1</span>
        </h1>

      </div>

      {/* Fade topo/rodapé — funde letras com as bordas pretas */}
      <div className="fade-overlay" style={{
        position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none',
      }} />

      {/* Botão — position:fixed fora do container blur */}
      <div className="rev-btn-wrap" style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) translateZ(0)',
        zIndex: 100, pointerEvents: 'none',
        willChange: 'transform', isolation: 'isolate',
      }}>
        <button
          className="rev-btn"
          onClick={() => setBlurred(b => !b)}
          style={{
            fontFamily: "'Big Shoulders Display', sans-serif",
            fontSize: 'clamp(9px, 7vw, 112px)',
            fontWeight: 900,
            letterSpacing: '0.4em',
            color: 'transparent',
            opacity: 1,
            textTransform: 'uppercase',
            background: 'transparent',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: 'none',
            borderRadius: '20px',
            boxShadow: `
              0 0 0 0.5px rgba(255,255,255,0.14),
              inset 0 1px 0 rgba(255,255,255,0.20),
              inset 0 -1px 0 rgba(0,0,0,0.28),
              0 12px 56px rgba(0,0,0,0.7),
              0 0 100px rgba(255,255,255,0.028)
            `,
            padding: 'clamp(10px, 1.4vw, 24px) clamp(32px, 5vw, 80px)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            paddingLeft: 'clamp(36px, 5.4vw, 88px)',
            transition: 'letter-spacing 0.3s, box-shadow 0.4s ease, color 0.3s ease',
            pointerEvents: 'auto',
            WebkitTapHighlightColor: 'transparent',
          } as React.CSSProperties}
        >
          <span style={{
            background: 'linear-gradient(180deg, rgba(60,60,60,0.9) 0%, rgba(160,160,160,0.95) 35%, rgba(255,255,255,1) 50%, rgba(160,160,160,0.95) 65%, rgba(60,60,60,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 1px rgba(255,255,255,0.35)',
          }}>Be Different</span>
        </button>
      </div>

    </>
  )
}
