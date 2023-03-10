// == Import
import './styles.scss';

import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../authContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BASE_API_URL}login_check`, {
      username,
      password,
    }, {withCredentials: true})
      .then((response) => {
      // Traitement de la réponse si la connexion réussit
      console.log(response.data)
        login(response.data.user, response.data.token_expires);
        navigate('/');
        console.log('connexion réussie');
      })
      .catch((error) => {
        setError('Identifiants incorrects.');        
        console.error(error);
      // Traitement de la réponse si la connexion échoue
      });
  };

  return (
    <section className="formContainer">
      <div className="formWrapper">
        <span className="formlogo">RythMeet</span>
        <span className="formtitle">C'est ici qu'on se connecte !</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="error">{error}</div>}
          <button type="submit">Se connecter</button>
        </form>
        <a className='linkregister' href='/register'>Si vous n'avez pas de compte, c'est par ici</a>
      </div>
    </section>
  );
}
