import { Ornament } from '../../components/Ornament.jsx';
import { Reveal } from '../../components/Reveal.jsx';
import { ERAS, PEOPLE } from '../../data/index.js';
import { Stat } from './Stat.jsx';
import './Intro.css';

const martires = PEOPLE.filter(p => p.tipo === 'martir').length;

const STATS = [
  { value: martires, label: 'mártires y memoriales' },
  { value: PEOPLE.length - martires, label: 'influencias nacionales' },
  { value: ERAS.length, label: 'épocas de la historia' },
  { value: 500, label: 'años de historia', suffix: '+' },
];

export function Intro() {
  return (
    <section className="section intro" id="entrada">
      <div className="wrap narrow">
        <Reveal as="p" className="kicker">Bienvenido a la sala</Reveal>
        <Reveal as="h2" className="title" delay={1}>Quien olvida su historia<br />pierde su camino</Reveal>
        <Reveal as={Ornament} delay={2} />
        <Reveal as="p" className="intro__text" delay={3}>
          Aquí descansan, en nichos de luz, los <strong>mártires</strong> que ofrendaron su vida por la soberanía y la libertad de Nicaragua,
          y las <strong>mayores influencias nacionales</strong>: caciques, heroínas, poetas y artistas que dieron forma a nuestra identidad.
          Pasa el cursor por cada retrato, ábrelo para conocer su historia y enciende una vela en su memoria.
        </Reveal>
        <ul className="stats">
          {STATS.map((s, i) => <Stat key={s.label} {...s} delay={i + 4} />)}
        </ul>
      </div>
    </section>
  );
}
