// == Import
import './styles.scss';
import { BiSearchAlt } from 'react-icons/bi';
import { TbGridDots } from 'react-icons/tb';
import { IoMdPerson } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../authContext';

export default function Topbar({
  menuOpen, setMenuOpen, onSearch,
}) {
  const { currentUser, logout } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    navigate('/concerts')
    onSearch(searchValue);
    console.log(searchValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="topbarSection">
      <section className="topbarLeft">
        <a href="/" className="logo">RythMeet</a>
      </section>
      <section className="topbarCenter">
        <div className="searchBar">
          <BiSearchAlt className="searchIcon" onClick={handleSearch} />
          <input
            placeholder="Cherche un artiste"
            type="search"
            className="searchInput"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </section>
      <section className="topbarRight">
        {currentUser ? (
        <div className="profile">
          <img src={`http://localhost:8000/uploads/images/users/${currentUser.img}`} alt="" className="topbarImg" />
          <div className="options">
            <a href="/" ><span>Accueil</span></a>
            <a href="/profil/me"><span>Profil</span></a>
            <a href="/mylist"><span>Ma liste</span></a>
            <a href="/" onClick={logout}><span>Déconnexion</span></a>
          </div>
        </div>
        ):
        (
          <div className="profile">
            <IoMdPerson className="topbarImg" />
            <div className="options">
            <a href="/" ><span>Accueil</span></a>
              <a href="/login"><span>Se connecter</span></a>
              <a href="/register"><span>Créer un compte</span></a>
            </div>
          </div>
        )}
        <div className="toggleNavbar">
          <TbGridDots className="toggleIcon" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </section>
    </section>
  );
}
Topbar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};
