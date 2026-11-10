/* Retrato ilustrado: busto en silueta sobre un sol de rayos.
   Lienzo de 300 x 400; las figuras se dibujan en una base de 100 x 120. */
import { memo, useId } from 'react';

const SHOULDERS = 'M4 120C4 95 26 86 50 81C74 86 96 95 96 120Z';
const NECK = 'M42 64h16l1.5 15c-5.5 5-14 5-19 0z';
const HAIR_M = 'M32.5 49C31 29 41 22 50 22s19 7 17.5 27c-2-9-8-13-17.5-13s-15.5 4-17.5 13z';
const HAIR_F = 'M29 52C26 26 38 17 50 17s24 9 21 35c1 14 4 26 9 38H20c5-12 8-24 9-38z';
const FEATHER_ANGLES = [-64, -42, -21, 0, 21, 42, 64];
const CX = 150;
const CY = 190;

const r2 = n => Math.round(n * 100) / 100;

/** Rayos del sol: iguales para todos los retratos, se calculan una sola vez. */
const RAYS = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  const w = (Math.PI / 18) * 0.42;
  const R = 520;
  return `M${CX} ${CY}L${r2(CX + Math.cos(a - w) * R)} ${r2(CY + Math.sin(a - w) * R)}L${r2(CX + Math.cos(a + w) * R)} ${r2(CY + Math.sin(a + w) * R)}z`;
});

function Body({ kind, acc }) {
  return (
    <>
      {kind === 'mujer' && <path d={HAIR_F} />}
      <path d={NECK} />
      <ellipse cx="50" cy="51" rx="17" ry="21" />
      {kind !== 'mujer' && <path d={HAIR_M} />}
      <path d={SHOULDERS} />
      {acc === 'sombrero' && (
        <>
          <ellipse cx="50" cy="35" rx="38" ry="7.5" />
          <path d="M33 35C33 6 67 6 67 35z" />
        </>
      )}
      {acc === 'boina' && (
        <>
          <ellipse cx="52" cy="31" rx="24" ry="9" transform="rotate(-9 52 31)" />
          <rect x="49.5" y="19" width="4.5" height="6" rx="2" />
        </>
      )}
    </>
  );
}

function Deco({ acc, h }) {
  if (acc === 'sombrero') {
    return <path d="M33.6 29.5c11 3.6 22.2 3.6 32.8 0" fill="none" stroke={`hsl(${h} 70% 62%)`} strokeWidth="2.2" opacity=".85" />;
  }
  if (acc === 'cuello') {
    return <rect x="46" y="80.5" width="8" height="5" rx="1" fill="#efe8d6" />;
  }
  if (acc === 'plumas') {
    return (
      <>
        {FEATHER_ANGLES.map((a, i) => (
          <ellipse
            key={a} cx="50" cy="13" rx="4.4" ry="16" transform={`rotate(${a} 50 45)`}
            fill={i % 2 ? '#e9b949' : `hsl(${h} 72% 52%)`} stroke="#0a0f1d" strokeWidth=".8"
          />
        ))}
        <path d="M32.5 41C42 36 58 36 67.5 41v5.5C58 41.5 42 41.5 32.5 46.5z" fill="#e9b949" stroke="#0a0f1d" strokeWidth=".8" />
      </>
    );
  }
  return null;
}

/** Busto colocado en el lienzo: contorno luminoso + relleno + accesorios. */
function Bust({ transform, kind, acc = null, h, fill, rim }) {
  return (
    <g transform={transform}>
      <g fill={rim} stroke={rim} strokeWidth="1.8" strokeLinejoin="round" opacity=".55"><Body kind={kind} acc={acc} /></g>
      <g fill={fill}><Body kind={kind} acc={acc} /></g>
      <Deco acc={acc} h={h} />
    </g>
  );
}

function Mask({ h }) {
  return (
    <g transform="translate(18 84) scale(2.64)">
      <path d={SHOULDERS} fill={`hsl(${h} 35% 9%)`} stroke={`hsl(${h} 90% 78%)`} strokeOpacity=".5" strokeWidth="1" />
      <path d="M30 81h40l-6 14H36z" fill="#d9b25a" opacity=".85" />
      <ellipse cx="50" cy="60" rx="22" ry="27" fill="#e6c28b" stroke="#6b4a1e" strokeWidth="1" />
      <path d="M14 40L50 8l36 32c-12-6-24-9-36-9s-24 3-36 9z" fill="#7a1f1f" stroke="#e9b949" strokeWidth="1.4" />
      <path d="M24 38c8-4 18-6 26-6s18 2 26 6" fill="none" stroke="#e9b949" strokeWidth="1.2" />
      <circle cx="50" cy="10" r="3" fill="#e9b949" />
      <path d="M33 49q7-5 14 0M53 49q7-5 14 0" fill="none" stroke="#2b1a10" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="40" cy="56" rx="4.6" ry="2.2" fill="#2b1a10" />
      <ellipse cx="60" cy="56" rx="4.6" ry="2.2" fill="#2b1a10" />
      <circle cx="35" cy="66" r="4.4" fill="#c4452f" opacity=".5" />
      <circle cx="65" cy="66" r="4.4" fill="#c4452f" opacity=".5" />
      <path d="M50 57l-5 14q5 3.5 10 0z" fill="#cf9d62" />
      <path d="M32 79q10-9 18-3 8-6 18 3-9 3-18 1.5-9 1.5-18-1.5z" fill="#2b1a10" />
      <path d="M42 85q8 11 16 0-8 3-16 0z" fill="#2b1a10" />
    </g>
  );
}

function Figure({ person, k }) {
  const h = person.hue;
  const rim = `hsl(${h} 92% 78%)`;
  const front = `url(#${k}sil)`;
  const back = `hsl(${h} 26% 11%)`;
  const kind = person.figura || 'hombre';

  if (kind === 'mascara') return <Mask h={h} />;
  if (kind === 'trio') {
    return (
      <>
        <Bust h={h} rim={rim} transform="translate(-54 152) scale(2)" kind="hombre" fill={back} />
        <Bust h={h} rim={rim} transform="translate(154 152) scale(2)" kind="mujer" fill={back} />
        <Bust h={h} rim={rim} transform="translate(35 118) scale(2.3)" kind="hombre" fill={front} />
      </>
    );
  }
  if (kind === 'dos') {
    return (
      <>
        <Bust h={h} rim={rim} transform="translate(-24 130) scale(2.4)" kind="hombre" fill={back} />
        <Bust h={h} rim={rim} transform="translate(84 124) scale(2.4)" kind="hombre" acc={person.acc} fill={front} />
      </>
    );
  }
  return <Bust h={h} rim={rim} transform="translate(18 84) scale(2.64)" kind={kind} acc={person.acc} fill={front} />;
}

export const PortraitArt = memo(function PortraitArt({ person }) {
  // useId produce caracteres no válidos dentro de url(#…); se limpian.
  const k = 'a' + useId().replace(/[^\w-]/g, '');
  const h = person.hue;
  return (
    <svg className="art" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${k}bg`} cx="50%" cy="42%" r="78%">
          <stop offset="0" stopColor={`hsl(${h} 85% 58%)`} />
          <stop offset=".38" stopColor={`hsl(${h} 62% 30%)`} />
          <stop offset="1" stopColor={`hsl(${(h + 215) % 360} 55% 7%)`} />
        </radialGradient>
        <radialGradient id={`${k}halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={`hsl(${h} 100% 88%)`} stopOpacity=".95" />
          <stop offset=".45" stopColor={`hsl(${h} 95% 66%)`} stopOpacity=".45" />
          <stop offset="1" stopColor={`hsl(${h} 90% 55%)`} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${k}sil`} gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="120">
          <stop offset="0" stopColor={`hsl(${h} 28% 15%)`} />
          <stop offset="1" stopColor={`hsl(${h} 32% 5%)`} />
        </linearGradient>
        <linearGradient id={`${k}fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset=".6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".7" />
        </linearGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#${k}bg)`} />
      <g className="art__rays" fill="#fff" fillOpacity=".085">
        {RAYS.map(d => <path key={d} d={d} />)}
      </g>
      <circle className="art__halo" cx={CX} cy={CY} r="108" fill={`url(#${k}halo)`} />
      <Figure person={person} k={k} />
      <rect width="300" height="400" fill={`url(#${k}fade)`} />
    </svg>
  );
});
