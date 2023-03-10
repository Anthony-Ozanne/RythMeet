// == Import
import './styles.scss';
import '../../styles/global.scss';

export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <section className={`menu flex ${menuOpen && 'active'}`}>
      <ul>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </section>
  );
}
