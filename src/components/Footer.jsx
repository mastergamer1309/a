import { Ornament } from './Ornament.jsx';
import './Footer.css';

export function Footer() {
  return (
    <footer className="foot">
      <Ornament />
      <p className="foot__quote">Honrar la memoria es mantener viva la patria.</p>
      <p className="foot__note">Contenido de apoyo para estudio. Contrasta las fechas y datos con tu libro de texto.</p>
    </footer>
  );
}
