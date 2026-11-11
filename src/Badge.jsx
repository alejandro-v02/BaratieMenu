import { useId } from 'react'
import Icon from './Icon'

/* Insignia circular tipo cartel "WANTED · DEAD OR ALIVE" */
export default function Badge({ icon, photo, pop, size = 74 }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className="badge" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <path id={`t${id}`} d="M 15 50 A 35 35 0 0 1 85 50" />
        <path id={`b${id}`} d="M 5 50 A 45 45 0 0 0 95 50" />
        <clipPath id={`c${id}`}><circle cx="50" cy="50" r="32" /></clipPath>
      </defs>
      {/* anillo con el texto: es lo único que gira */}
      <g className="badge-ring">
        <circle cx="50" cy="50" r="48" fill="#c9985a" stroke="#3a1d0d" strokeWidth="3" />
        <circle cx="10.5" cy="50" r="2.2" fill="#3a1d0d" />
        <circle cx="89.5" cy="50" r="2.2" fill="#3a1d0d" />
        <text fill="#3a1d0d" fontFamily="Bangers, cursive" fontWeight="400" fontSize="10" letterSpacing="1.5" textAnchor="middle">
          <textPath href={`#t${id}`} startOffset="50%">WANTED</textPath>
        </text>
        <text fill="#3a1d0d" fontFamily="Bangers, cursive" fontWeight="400" fontSize="8.5" letterSpacing="1" textAnchor="middle">
          <textPath href={`#b${id}`} startOffset="50%">DEAD OR ALIVE</textPath>
        </text>
      </g>
      <circle cx="50" cy="50" r="33" fill="#ecd3a3" stroke="#3a1d0d" strokeWidth="2" />
      {!photo && (
        <g transform="translate(30 30)" color="#3a1d0d">
          <Icon name={icon} size={40} />
        </g>
      )}
      {photo && pop && (
        <image href={photo} x="8" y="-6" width="84" height="104" preserveAspectRatio="xMidYMax meet" className="badge-pop" />
      )}
      {photo && !pop && <image href={photo} x="17" y="17" width="66" height="66" preserveAspectRatio="xMidYMid slice" clipPath={`url(#c${id})`} />}
    </svg>
  )
}

/* Calavera con sombrero de paja y huesos cruzados */
export function JollyRoger({ size = 110 }) {
  return (
    <svg className="roger" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 21L20.5 12M20.5 21L3.5 12" strokeWidth="2" />
      <circle cx="3" cy="20.8" r="1" fill="currentColor" /><circle cx="21" cy="20.8" r="1" fill="currentColor" />
      <circle cx="3" cy="12.2" r="1" fill="currentColor" /><circle cx="21" cy="12.2" r="1" fill="currentColor" />
      <g transform="translate(2.4 3.4) scale(.8)">
        <path d="M12 3C7.6 3 4 6.1 4 10.2c0 2.3 1.1 4.1 3 5.3V19h10v-3.5c1.9-1.2 3-3 3-5.3C20 6.1 16.4 3 12 3z" fill="#f1dcb0" />
        <circle cx="8.6" cy="10.5" r="1.7" fill="currentColor" /><circle cx="15.4" cy="10.5" r="1.7" fill="currentColor" />
        <path d="M12 13l-1 2h2z M10 19v-2 M12 19v-2 M14 19v-2" />
      </g>
      <ellipse cx="12" cy="8" rx="9.5" ry="2" fill="#d9a441" />
      <path d="M7.4 7.6C7.4 3.8 9.2 2.2 12 2.2s4.6 1.6 4.6 5.4" fill="#d9a441" />
      <path d="M7.5 6.2c3 .9 6 .9 9 0" stroke="#1d5c6b" strokeWidth="1.6" />
    </svg>
  )
}
