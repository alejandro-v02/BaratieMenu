import { useCallback, useEffect, useId, useState } from 'react'
import Icon from './Icon'
import './chest.css'

const berry = (p) => `฿${p}`

const SPARKLE = 'M0 -7L2 -2L7 0L2 2L0 7L-2 2L-7 0L-2 -2Z'

// Cofre dibujado en SVG. Se usa en el botón flotante y dentro del modal.
// open: tapa levantada con luz; auto: se abre solo cada tanto (botón flotante)
export function Chest({ open = false, auto = false }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={`chest${open ? ' is-open' : ''}${auto ? ' auto' : ''}`} viewBox="0 0 120 104" aria-hidden="true">
      <defs>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8743a" />
          <stop offset="1" stopColor="#6a3f19" />
        </linearGradient>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c08a45" />
          <stop offset="1" stopColor="#7e4d22" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0a8" />
          <stop offset=".5" stopColor="#e0b060" />
          <stop offset="1" stopColor="#b9793f" />
        </linearGradient>
        <radialGradient id={`r${id}`}>
          <stop offset="0" stopColor="#fffbd0" />
          <stop offset=".55" stopColor="#ffd36a" />
          <stop offset="1" stopColor="#ffd36a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`b${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff4b0" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff4b0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* haz de luz que sale al abrir */}
      <polygon className="chest-beam" points="20,50 100,50 124,-40 -4,-40" fill={`url(#b${id})`} />

      {/* cuerpo de madera */}
      <rect x="10" y="48" width="100" height="50" rx="5" fill={`url(#w${id})`} stroke="#1a0d05" strokeWidth="3.5" />
      <path d="M36 52V96 M60 52V96 M84 52V96" stroke="#1a0d05" strokeOpacity=".28" strokeWidth="1.6" />
      <rect x="10" y="56" width="100" height="8" fill={`url(#g${id})`} stroke="#1a0d05" strokeWidth="2.5" />
      <rect x="10" y="86" width="100" height="8" fill={`url(#g${id})`} stroke="#1a0d05" strokeWidth="2.5" />
      <g fill="#1a0d05">
        <circle cx="19" cy="60" r="1.7" />
        <circle cx="101" cy="60" r="1.7" />
        <circle cx="19" cy="90" r="1.7" />
        <circle cx="101" cy="90" r="1.7" />
      </g>

      {/* interior brillante */}
      <ellipse className="chest-glow" cx="60" cy="49" rx="48" ry="9" fill={`url(#r${id})`} />

      {/* tapa */}
      <g className="chest-lid">
        <path d="M10 50V36C10 8 110 8 110 36V50Z" fill={`url(#l${id})`} stroke="#1a0d05" strokeWidth="3.5" strokeLinejoin="round" />
        <rect x="26" y="12" width="9" height="38" fill={`url(#g${id})`} stroke="#1a0d05" strokeWidth="2.5" />
        <rect x="85" y="12" width="9" height="38" fill={`url(#g${id})`} stroke="#1a0d05" strokeWidth="2.5" />
        <path d="M18 28C36 12 84 12 102 28" fill="none" stroke="#fff" strokeOpacity=".28" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* cerradura */}
      <rect x="48" y="46" width="24" height="22" rx="4.5" fill={`url(#g${id})`} stroke="#1a0d05" strokeWidth="3" />
      <circle cx="60" cy="55" r="3.4" fill="#1a0d05" />
      <rect x="58.5" y="56" width="3" height="7" fill="#1a0d05" />

      {/* destellos */}
      <g transform="translate(14 22)">
        <path className="sparkle s1" d={SPARKLE} fill="#fff6c2" stroke="#1a0d05" strokeWidth="1.2" />
      </g>
      <g transform="translate(108 14)">
        <path className="sparkle s2" d={SPARKLE} fill="#fff6c2" stroke="#1a0d05" strokeWidth="1.2" />
      </g>
      <g transform="translate(96 62)">
        <path className="sparkle s3" d={SPARKLE} fill="#fff6c2" stroke="#1a0d05" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

const BURSTS = [
  [-130, -90],
  [-92, -135],
  [-46, -165],
  [0, -178],
  [46, -165],
  [92, -135],
  [130, -90],
  [-20, -110],
]

// Cofre flotante abajo: se mueve, suelta monedas, dice mensajes cortos y al tocarlo abre el modal
export function FloatingChest({ box }) {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState('closed') // closed -> opening -> cards
  const [flipped, setFlipped] = useState([])
  const [idx, setIdx] = useState(0)
  const [showMsg, setShowMsg] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  const openModal = () => {
    setFlipped([])
    setStage('closed')
    setOpen(true)
  }
  const startOpening = () => stage === 'closed' && setStage('opening')
  const flip = (i) => setFlipped((f) => (f.includes(i) ? f : [...f, i]))

  // mensajes pequeños que salen cada tanto y se van solos
  useEffect(() => {
    if (open) return
    let hide
    const show = () => {
      setIdx((i) => i + 1)
      setShowMsg(true)
      hide = setTimeout(() => setShowMsg(false), 2600)
    }
    const first = setTimeout(show, 1800)
    const every = setInterval(show, 5600)
    return () => {
      clearTimeout(first)
      clearTimeout(hide)
      clearInterval(every)
    }
  }, [open])

  // el cofre se abre y pasa a mostrar las cartas
  useEffect(() => {
    if (stage !== 'opening') return
    const t = setTimeout(() => setStage('cards'), 1400)
    return () => clearTimeout(t)
  }, [stage])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close])

  return (
    <>
      <button type="button" className="chest-fab" onClick={openModal} aria-label="Abrir la cajita sorpresa">
        <span className="fab-aura" />
        <span className={`chest-msg${showMsg && !open ? ' on' : ''}`}>{box.messages[idx % box.messages.length]}</span>
        <span className="coin c1" />
        <span className="coin c2" />
        <span className="coin c3" />
        <span className="coin c4" />
        <Chest auto />
      </button>

      {open && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal-rays" aria-hidden="true" />
          <button type="button" className="modal-close" onClick={close} aria-label="Cerrar">
            ×
          </button>

          {stage !== 'cards' ? (
            <div className="chest-stage" onClick={(e) => e.stopPropagation()}>
              <h3 className="mystery-title">CAJITA SORPRESA</h3>
              <button type="button" className={`big-chest${stage === 'opening' ? ' opening' : ''}`} onClick={startOpening} aria-label="Abrir el cofre">
                <Chest open={stage === 'opening'} />
                {stage === 'opening' && (
                  <>
                    <span className="flash" />
                    {BURSTS.map(([x, y], i) => (
                      <span key={i} className="burst" style={{ '--bx': `${x}px`, '--by': `${y}px`, animationDelay: `${i * 0.05}s` }} />
                    ))}
                  </>
                )}
              </button>
              <p className="tap-hint">{stage === 'closed' ? 'Toca el cofre para abrirlo' : '¡Ahí viene!'}</p>
            </div>
          ) : (
            <div className="reward" role="dialog" aria-modal="true" aria-label="Cajita sorpresa" onClick={(e) => e.stopPropagation()}>
              <div className="pennant pennant-title reward-ribbon">
                <h2>Tu recompensa</h2>
              </div>
              <p className="reward-hint">{box.hint}</p>
              <div className="mystery-cards">
                {box.items.map((it, i) => (
                  <button
                    type="button"
                    key={it.name}
                    style={{ '--i': i }}
                    className={`mcard${flipped.includes(i) ? ' flipped' : ''}`}
                    onClick={() => flip(i)}
                    aria-label={flipped.includes(i) ? it.name : 'Carta misteriosa'}
                  >
                    <span className="mcard-inner">
                      <span className="mcard-face mcard-front">
                        <span className="mcard-q">?</span>
                      </span>
                      <span className="mcard-face mcard-back">
                        <span className="mcard-icon">
                          <Icon name={it.icon} size={40} />
                        </span>
                        <b>{it.name}</b>
                        {it.secret && <small>{it.secret}</small>}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="reward-footer">
                <div className="pennant pennant-title reward-price">
                  <small>PRECIO</small>
                  <b>{berry(box.price)}</b>
                </div>
                <button type="button" className="modal-reveal" onClick={() => setFlipped(box.items.map((_, i) => i))}>
                  Revelar todo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
