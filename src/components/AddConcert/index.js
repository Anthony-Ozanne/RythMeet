import './styles.scss';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// page of form of concert creation
export default function AddConcertForm() {
  const navigate = useNavigate();

  // state
  const [artist_name, setArtiste_name] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [showModal, setShowModal] = useState(false);

  // function to handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // send the request data
    await axios.post(`${process.env.REACT_APP_BASE_API_URL}concert/create`, {
      artist_name,
      date,
      place,
    }, {withCredentials:true})
      .then((response) => {
        console.log(response);
        // validation message
        setShowModal(true);
        setTimeout(() => {
          // link to the user concert list
          navigate('/mylist', { state: { message: 'Ton concert a bien été créé &#128522;' } });
        }, 2000);
      })
      .catch((error) => {
        alert('Il y a une erreur');
        console.error(error);
        // Traitement de la réponse si la connexion échoue
      });
  };

  return (
    <section className="form">
      <Modal
        className="custom-modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="confirmation Modal"
      >
        <h2>Ton concert a bien été créé &#128522;</h2>
      </Modal>
      <form onSubmit={handleSubmit}>
        <h2>Ajoute ton concert</h2>
        <div className="inputs">
          <div className="form_right">
            <label className="label">
              Qui?
              <input className="input" type="text" name="artist" placeholder="l'artiste" value={artist_name} onChange={(e) => setArtiste_name(e.target.value)} />
            </label>
            <label className="label">Où?
              <input className="input" type="text" name="place" placeholder="Le lieux" value={place} onChange={(e) => setPlace(e.target.value)} />
            </label>
            <label className="label">
              Quand?
              <input className="input" type="date" name="date" placeholder="jj/mm/aaaa" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>
        </div>
        <div className="form_bottom">
          <input className="button" type="submit" value="Envoyer" />
        </div>
      </form>
    </section>
  );
}
