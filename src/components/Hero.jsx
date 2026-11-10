const LINES = ['Sala de la', 'Memoria Nacional'];

/* Título letra por letra: cada carácter recibe su índice para el retraso */
function SplitTitle() {
  let i = 0;
  return (
    <h1 className="split" aria-label="Sala de la Memoria Nacional">
      {LINES.map(line => (
        <span className="line" aria-hidden="true" key={line}>
          {line.split(' ').map((word, w, all) => (
            <span key={w}>
              <span className="word">
                {[...word].map((chr, c) => <span className="ch" style={{ '--i': i++ }} key={c}>{chr}</span>)}
              </span>
              {w < all.length - 1 && ' '}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ ref, contentRef }) {
  return (
    <header className="hero" id="inicio" ref={ref}>
      <div className="hero__sky" />

      <div className="layer layer--sun" data-near=".1"><div className="sun" /></div>

      <div className="layer" data-near=".3">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="ridge ridge--back" aria-hidden="true">
          <path d="M0 420V300C90 285 170 262 250 278C320 292 370 300 420 240C450 200 470 170 495 140C505 128 525 128 535 140C560 172 590 215 620 262C660 320 720 300 800 290C880 280 940 240 1010 252C1080 264 1130 300 1200 280C1270 260 1320 215 1370 228C1400 236 1425 250 1440 258V420Z" />
        </svg>
      </div>
      <div className="layer" data-near=".55">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="ridge ridge--mid" aria-hidden="true">
          <path d="M0 320V210C80 190 150 140 220 120C250 112 270 114 290 128C340 165 380 215 450 230C540 250 600 200 680 190C760 180 800 225 880 232C970 240 1030 170 1100 140C1135 125 1160 125 1185 142C1240 182 1300 215 1370 210C1405 208 1425 200 1440 195V320Z" />
        </svg>
      </div>
      <div className="layer" data-near=".85">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="ridge ridge--front" aria-hidden="true">
          <path d="M0 200V120C120 100 220 130 340 125C460 120 520 80 640 90C760 100 820 140 960 138C1100 136 1200 90 1320 96C1370 98 1410 108 1440 118V200Z" />
        </svg>
      </div>

      <div className="hero__content" ref={contentRef}>
        <p className="eyebrow fade-in" style={{ '--d': '.2s' }}>Nicaragua · Memoria viva</p>
        <SplitTitle />
        <p className="lead fade-in" style={{ '--d': '1.9s' }}>
          Un hogar de luz para quienes entregaron la vida por la patria y para quienes la hicieron grande con su palabra, su valentía y su ejemplo.
        </p>
        <div className="fade-in" style={{ '--d': '2.3s' }}>
          <a className="btn" href="#galeria">Entrar a la sala</a>
        </div>
      </div>

      <a className="cue" href="#entrada" aria-label="Seguir bajando"><span /></a>
    </header>
  );
}
