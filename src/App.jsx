import { Fragment, useCallback, useEffect, useState } from 'react'
import { pages, mysteryBox } from './menuData'
import Badge, { JollyRoger } from './Badge'
import { FloatingChest } from './Chest'
import './styles.css'

const berry = (p) => (p.startsWith('+') ? `+฿${p.slice(1)}` : `฿${p}`)

// alterna izquierda / derecha en el orden en que aparecen los bloques
const sides = {}
let n = 0
pages.forEach((p) => {
  if (p.title) sides[`${p.id}-head`] = n++ % 2 ? 'right' : 'left'
  p.sections.forEach((s) => {
    sides[s.title] = n++ % 2 ? 'right' : 'left'
  })
})

function Section({ section }) {
  return (
    <section className={`section side-${sides[section.title]}${section.char && !section.charBelow ? ' has-char' : ''}${section.charPeek ? ' has-peek' : ''}${section.stretchFirst ? ' stretch-first' : ''}`}>
      {section.char && !section.charBelow && <Character n={section.char} peek={section.charPeek} messages={section.charMessages} bubble={section.charBubble} shout={section.charShout} side={sides[section.title] === 'left' ? 'right' : 'left'} />}
      <div className="section-head">
        {!section.noBadge && <Badge icon={section.icon} photo={section.photo} pop={section.pop} size={136} />}
        <div className="banners">
          <div className="pennant pennant-title">
            <h2>{section.title}</h2>
          </div>
          {section.quote && (
            <div className="pennant pennant-quote">
              <p>“{section.quote}”</p>
            </div>
          )}
        </div>
      </div>
      {section.items && (
        <ul className="items">
          {section.items.map((it) => (
            <li className={`item${it.desc ? ' item-level' : ''}`} key={it.name}>
              {it.desc ? (
                <>
                  <div className="item-top">
                    <span className="name-chip">{it.name}</span>
                    <span className="price">{berry(it.price)}</span>
                  </div>
                  <div className="item-bottom">
                    {it.tag && (
                      <span className="pennant level-pennant">
                        <span>{it.tag.split(' ')[0]}</span>
                        <b>{it.tag.split(' ').slice(1).join(' ')}</b>
                      </span>
                    )}
                    <p className="item-desc">{it.desc}</p>
                  </div>
                </>
              ) : (
                <div className="item-top">
                  <div className="item-text">
                    {it.tag && <small>{it.tag}</small>}
                    <span className="item-name">{it.name}</span>
                  </div>
                  <span className="price">{berry(it.price)}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {section.strip && <img className="section-strip" src={section.strip} alt="" loading="lazy" />}
      {section.chips && (
        <div className="chips-wrap">
          <div className="chips">
            {section.chips.flavors.map((f) => (
              <span className="chip" key={f}>
                {f}
              </span>
            ))}
          </div>
          <p className="chips-price">
            {section.chips.label} · <b>{berry(section.chips.price)}</b>
          </p>
        </div>
      )}
      {section.char && section.charBelow && <Character n={section.char} side="below" />}
    </section>
  )
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="divider-line" />
      <JollyRoger size={40} />
      <span className="divider-line" />
    </div>
  )
}

// Personaje recortado (PNG sin fondo) junto a las tarjetas de una sección.
// Coloca las imágenes en public/personajes/personaje-1.png ... personaje-6.png
function Character({ n, side, peek, messages, bubble, shout }) {
  const [missing, setMissing] = useState(false)
  const [msg, setMsg] = useState(null) // { text, key }
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // al tocar al personaje sale un mensaje en un globo; se va solo a los pocos segundos
  const talk = () => {
    if (!messages?.length) return
    setLeaving(false)
    setMsg({ text: messages[count % messages.length], key: count })
    setCount((c) => c + 1)
  }
  useEffect(() => {
    if (!msg) return
    // se queda unos 2,6 s, se desvanece en 0,4 s y se quita
    const fade = setTimeout(() => setLeaving(true), 2600)
    const done = setTimeout(() => setMsg(null), 3000)
    return () => {
      clearTimeout(fade)
      clearTimeout(done)
    }
  }, [msg])

  const img = missing ? (
    <div className="char-placeholder">Personaje {n}</div>
  ) : (
    <img src={`/personajes/personaje-${n}.png`} alt="" loading="lazy" onError={() => setMissing(true)} />
  )

  return (
    <div className={`section-char char-${side}${peek ? ' char-peek' : ''}${messages ? ' talks' : ''}${bubble === 'top' ? ' bubble-top' : ''}${shout ? ' shout' : ''}`}>
      {messages ? (
        <button type="button" className="char-btn" onClick={talk} aria-label="Tocar al personaje">
          {img}
        </button>
      ) : (
        img
      )}
      {msg && (
        <div className={`char-bubble${leaving ? ' leaving' : ''}`} key={msg.key} role="status">
          {msg.text}
        </div>
      )}
    </div>
  )
}

function Page({ page, lastPage }) {
  return (
    <div className="screen">
      <span className="fx" aria-hidden="true">{page.fx}</span>
      {page.title && (
        <header className={`drinks-head side-${sides[`${page.id}-head`]}`}>
          <div className="section-head">
            <Badge icon={page.icon} photo={page.photo} size={136} />
            <div className="banners">
              <div className="pennant pennant-title">
                <h2>{page.title}</h2>
              </div>
              <div className="pennant pennant-quote">
                <p>“{page.subtitle}”</p>
              </div>
            </div>
          </div>
        </header>
      )}
      {page.sections.map((s, i) => (
        <Fragment key={s.title}>
          <Section section={s} />
          {(!lastPage || i < page.sections.length - 1) && <Divider />}
        </Fragment>
      ))}
      {page.footer && (
        <footer className="menu-footer">
          <svg className="cloud-bg" viewBox="0 0 300 130" preserveAspectRatio="none" aria-hidden="true">
            <path d="M60 108C20 108 10 70 42 62C38 28 90 18 108 42C125 8 190 8 205 40C235 22 285 42 262 74C300 85 280 118 245 108C225 126 185 124 170 108C150 126 105 124 92 108C80 118 70 114 60 108Z" />
          </svg>
          <p>{page.footer[0]}</p>
          <strong>{page.footer[1]}</strong>
        </footer>
      )}
    </div>
  )
}

const MIN_SPLASH = 2200

function Splash({ leaving, onDone }) {
  useEffect(() => {
    const img = new Promise((res) => {
      const im = new Image()
      im.onload = im.onerror = res
      im.src = '/fondo.jpg'
    })
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const wait = new Promise((res) => setTimeout(res, MIN_SPLASH))
    Promise.all([img, fonts, wait]).then(onDone)
  }, [onDone])

  return (
    <div className={`splash${leaving ? ' leaving' : ''}`} role="status" aria-label="Cargando">
      <div className="splash-roger">
        <JollyRoger size={120} />
      </div>
      <h1>BARATIE</h1>
      <h3>El Rey Pirata</h3>
      <div className="bar" style={{ '--t': `${MIN_SPLASH}ms` }}>
        <i />
      </div>
      <p className="loading">Cargando</p>
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('loading') // loading -> leaving -> done
  const started = phase !== 'loading'
  const finishLoading = useCallback(() => setPhase('leaving'), [])

  useEffect(() => {
    if (phase !== 'leaving') return
    const t = setTimeout(() => setPhase('done'), 800)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <>
      <div className="bg" aria-hidden="true" />
      <div className="bg-logo" aria-hidden="true" />
      {started && (
        <>
          <div className="edge edge-top" aria-hidden="true" />
          <div className="edge edge-bottom" aria-hidden="true" />
          <main className="app">
            {pages.map((p, i) => (
              <Page key={p.id} page={p} lastPage={i === pages.length - 1} />
            ))}
          </main>
          <FloatingChest box={mysteryBox} />
        </>
      )}
      {phase !== 'done' && <Splash leaving={phase === 'leaving'} onDone={finishLoading} />}
    </>
  )
}
