import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
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

// Imagen con varios personajes: cada uno tiene su zona y, al tocarlo, dice su propio mensaje
function CharGroup({ group }) {
  const [counts, setCounts] = useState(() => group.members.map(() => 0))
  const [msg, setMsg] = useState(null) // { who, text, key }
  const [leaving, setLeaving] = useState(false)
  const boxRef = useRef(null)

  const talk = (i) => {
    const list = group.members[i].messages
    const mem = group.members[i]
    const w = boxRef.current ? boxRef.current.offsetWidth : 360
    const cx = ((mem.left + mem.width / 2) / 100) * w // centro del personaje en px
    setMsg({ who: i, text: list[counts[i] % list.length], key: Date.now(), tl: cx, tr: w - cx })
    setCounts((c) => c.map((n, k) => (k === i ? n + 1 : n)))
    setLeaving(false)
  }

  useEffect(() => {
    if (!msg) return
    const fade = setTimeout(() => setLeaving(true), 2600)
    const done = setTimeout(() => setMsg(null), 3000)
    return () => {
      clearTimeout(fade)
      clearTimeout(done)
    }
  }, [msg])

  const who = msg ? group.members[msg.who] : null
  const center = who ? who.left + who.width / 2 : 0

  return (
    <div className="char-group" ref={boxRef}>
      <img src={group.src} alt="" loading="lazy" />
      {group.members.map((mem, i) => (
        <button
          type="button"
          key={mem.name}
          className="char-hit"
          style={{ left: `${mem.left}%`, width: `${mem.width}%` }}
          onClick={() => talk(i)}
          aria-label={`Tocar a ${mem.name}`}
        />
      ))}
      {msg && (
        <div
          key={msg.key}
          role="status"
          className={`char-bubble group-bubble align-${who.align}${leaving ? ' leaving' : ''}`}
          style={{ '--cx': `${center}%`, '--tl': `${msg.tl}px`, '--tr': `${msg.tr}px` }}
        >
          {msg.text}
        </div>
      )}
    </div>
  )
}

function Section({ section }) {
  return (
    <section className={`section side-${sides[section.title]}${section.char && !section.charBelow ? ' has-char' : ''}${section.charPeek ? ' has-peek' : ''}${section.charWide ? ' char-wide' : ''}${section.stretchFirst ? ` stretch-first stretch-${Number(section.stretchFirst)}` : ''}`}>
      {section.char && !section.charBelow && <Character n={section.char} peek={section.charPeek} messages={section.charMessages} members={section.charMembers} rock={section.charRock} bubble={section.charBubble} shout={section.charShout} side={sides[section.title] === 'left' ? 'right' : 'left'} />}
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
      {section.group && <CharGroup group={section.group} />}
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
function Character({ n, side, peek, messages, members, bubble, shout, rock }) {
  const [missing, setMissing] = useState(false)
  const [msg, setMsg] = useState(null) // { text, key }
  const [count, setCount] = useState(0)
  const [counts, setCounts] = useState(() => (members ? members.map(() => 0) : []))
  const [leaving, setLeaving] = useState(false)
  const [rockKey, setRockKey] = useState(0) // cada toque reinicia el vaivén

  // varios personajes en la misma imagen: cada uno dice sus propios mensajes
  const talkMember = (i) => {
    const list = members[i].messages
    setLeaving(false)
    setMsg({ text: list[counts[i] % list.length], key: Date.now(), who: i })
    setCounts((c) => c.map((n2, k) => (k === i ? n2 + 1 : n2)))
  }

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
    <img key={rockKey} className={rockKey ? 'rocking' : undefined} src={`/personajes/personaje-${n}.png`} alt="" loading="lazy" onError={() => setMissing(true)} />
  )

  return (
    <div className={`section-char char-${side}${peek ? ' char-peek' : ''}${messages || members || rock ? ' talks' : ''}${bubble === 'top' ? ' bubble-top' : ''}${shout ? ' shout' : ''}`}>
      {members ? (
        <div className="char-body">
          {img}
          {members.map((mem, i) => (
            <button
              type="button"
              key={mem.name}
              className="char-zone"
              style={{ top: `${mem.top}%`, height: `${mem.height}%` }}
              onClick={() => talkMember(i)}
              aria-label={`Tocar a ${mem.name}`}
            />
          ))}
        </div>
      ) : messages || rock ? (
        <button
          type="button"
          className="char-btn"
          onClick={() => {
            talk()
            if (rock) setRockKey((k) => k + 1)
          }}
          aria-label="Tocar al personaje"
        >
          {img}
        </button>
      ) : (
        img
      )}
      {rock && rockKey > 0 && (
        <span className="sea" key={`sea${rockKey}`} aria-hidden="true">
          <svg className="wave wave-back" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path d="M0 14Q12.5 0 25 14T50 14T75 14T100 14T125 14T150 14T175 14T200 14V40H0Z" />
          </svg>
          <svg className="wave wave-front" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path d="M0 14Q12.5 0 25 14T50 14T75 14T100 14T125 14T150 14T175 14T200 14V40H0Z" />
          </svg>
        </span>
      )}
      {msg && (
        <div
          className={`char-bubble${leaving ? ' leaving' : ''}${members ? ' member-bubble' : ''}`}
          style={members ? { top: `${members[msg.who].top + members[msg.who].height / 2}%` } : undefined}
          key={msg.key}
          role="status"
        >
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
        <div className="finale">
        <footer className="menu-footer">
          <svg className="cloud-bg" viewBox="0 0 300 130" preserveAspectRatio="none" aria-hidden="true">
            <path d="M60 108C20 108 10 70 42 62C38 28 90 18 108 42C125 8 190 8 205 40C235 22 285 42 262 74C300 85 280 118 245 108C225 126 185 124 170 108C150 126 105 124 92 108C80 118 70 114 60 108Z" />
          </svg>
          <p>{page.footer[0]}</p>
          <strong>{page.footer[1]}</strong>
        </footer>
        <img className="finale-img" src="/personajes/final.png" alt="" loading="lazy" />
        </div>
      )}
    </div>
  )
}

const MIN_SPLASH = 2200

function Splash({ leaving, onDone }) {
  useEffect(() => {
    // se espera a que carguen la imagen de carga y el fondo del menú
    const img = Promise.all(
      ['/carga.jpg', '/fondo.jpg'].map(
        (src) =>
          new Promise((res) => {
            const im = new Image()
            im.onload = im.onerror = res
            im.src = src
          }),
      ),
    )
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const wait = new Promise((res) => setTimeout(res, MIN_SPLASH))
    Promise.all([img, fonts, wait]).then(onDone)
  }, [onDone])

  return (
    <div className={`splash${leaving ? ' leaving' : ''}`} role="status" aria-label="Cargando">
      <div className="splash-half left">
        <div className="splash-img" />
      </div>
      <div className="splash-half right">
        <div className="splash-img" />
      </div>
      <div className="splash-ui">
        <p className="splash-tagline">El sabor de un verdadero Pirata</p>
        <div className="bar" style={{ '--t': `${MIN_SPLASH}ms` }}>
          <i />
        </div>
        <p className="loading">Cargando</p>
      </div>
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('loading') // loading -> leaving -> done
  const started = phase !== 'loading'
  const finishLoading = useCallback(() => setPhase('leaving'), [])

  useEffect(() => {
    if (phase !== 'leaving') return
    const t = setTimeout(() => setPhase('done'), 1150)
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
