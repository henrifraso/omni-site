import { useEffect, useRef } from 'react'

const styles = `
  * { cursor: none; }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <style>{styles}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* Paper grain */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.032,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* OS1 */}
        <h1 style={{
          fontFamily: "'Big Shoulders Display', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(280px, 83vw, 1320px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.82,
          color: '#000',
          margin: 0,
          whiteSpace: 'nowrap',
          transform: 'translateX(-7vw) translateY(3vh)',
          userSelect: 'none',
          zIndex: 3,
        }}>
          OS<span style={{
            display: 'inline-block',
            transform: 'scaleX(2.0) translateX(16%)',
            transformOrigin: 'center',
          }}>1</span>
        </h1>

        {/* Label bottom-left */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(18px, 3.5vw, 36px)',
          left: 'clamp(24px, 5vw, 64px)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(8px, 0.72vw, 11px)',
          letterSpacing: '0.28em',
          color: '#000',
          opacity: 0.22,
          textTransform: 'uppercase',
          userSelect: 'none',
          zIndex: 4,
          animation: 'fade-up 0.8s ease 1.5s both',
        }}>
          Operating System One
        </div>

        {/* Label bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(18px, 3.5vw, 36px)',
          right: 'clamp(24px, 5vw, 64px)',
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(8px, 0.72vw, 11px)',
          letterSpacing: '0.2em',
          color: '#000',
          opacity: 0.14,
          userSelect: 'none',
          zIndex: 4,
          animation: 'fade-up 0.8s ease 1.7s both',
        }}>
          v1.0.0
        </div>

        {/* Cursor — DOM direto, sem re-render */}
        <div ref={cursorRef} style={{
          position: 'fixed',
          left: -100,
          top: -100,
          width: 22,
          height: 22,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#000', marginTop: -0.5 }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#000', marginLeft: -0.5 }} />
        </div>

      </div>
    </>
  )
}
