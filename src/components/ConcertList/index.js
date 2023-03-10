import './styles.scss';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext';
import PropTypes from 'prop-types';
// page of concert list after search

export default function ConcertList({ searchValue, concert }) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('date');
  const [concerts, setConcerts] = useState([]);
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const { currentUser, logout } = useContext(AuthContext);
  // Paging system
  const [concertsPerPage, setConcertsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  function handleCreateConcert() {
    navigate('/concert/create');
  }

  function sortByDate() {
    const sortedConcerts = [...filteredConcerts]; // faire une copie du tableau pour éviter de modifier le tableau d'origine
    sortedConcerts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(b.date) - new Date(a.date); // Descendant
      }
      return new Date(a.date) - new Date(b.date); // Ascendant
    });
    return sortedConcerts;
  }

  function sortByName() {
    const sortedConcerts = [...filteredConcerts];
    sortedConcerts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.artist_name.localeCompare(b.artist_name); // Ascendant
      }
      return b.artist_name.localeCompare(a.artist_name); // Descendant
    });
    return sortedConcerts;
  }

  let sortedConcerts = filteredConcerts;
  if (sortBy === 'date') {
    sortedConcerts = sortByDate(filteredConcerts, sortOrder);
  }
  else if (sortBy === 'name') {
    sortedConcerts = sortByName(filteredConcerts, sortOrder);
  }

  // Paging system
  const totalConcerts = sortedConcerts.length;
  const totalPages = Math.ceil(totalConcerts / concertsPerPage);

  function handlePageClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastConcert = currentPage * concertsPerPage;
  const indexOfFirstConcert = indexOfLastConcert - concertsPerPage;
  const currentConcerts = sortedConcerts.slice(indexOfFirstConcert, indexOfLastConcert);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredConcerts]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_URL}concerts`)
      .then((response) => {
        setConcerts(response.data.concerts);
        setFilteredConcerts(response.data.concerts);
      })
      .catch((error) => {
        alert('Il y a une erreur');
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (searchValue !== '') {
      const filtered = concerts.filter((c) => c.artist_name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredConcerts(filtered);
    }
    else {
      setFilteredConcerts(concerts);
    }
  }, [searchValue, concerts]);

  return (
    <section className="container">
      <div className="top">
        <p>Nombre de resultat: <span>{filteredConcerts.length}</span></p>

        {currentUser ? (
          <button className="glow-on-hover" type="button" onClick={handleCreateConcert}>
            Créer mon concert
          </button>
        ) : (
          <button type="button" className="glow-on-hover">
            <a href="/login"><span>Merci de vous connecter</span></a>
          </button>
        )}

        <label className="labelTop">
          <p>Trier par :</p>
          <select name="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="name">Nom</option>
          </select>
        </label>
      </div>
      <div className="list">
        {currentConcerts.map((data) => (
          <a className="gridWrapper" href={`/concerts/${data.id}`} key={data.id}>
            <section className="concert_container">
              <div className="right_side">
                <h3>{data.artist_name}</h3>
                <div className="info_event">
                  <p>{data.place}</p>
                  <p>{moment(data.date).format('DD/MM/YYYY')}</p>
                </div>


              </div>
            </section>
          </a>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button className="load-more" type="button" key={pageNumber} onClick={() => handlePageClick(pageNumber)}>{pageNumber}</button>
        ))}
      </div>
    </section>
  );
}
ConcertList.propTypes = {
  searchValue: PropTypes.string.isRequired,
  concert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    artist_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
  }),
};


