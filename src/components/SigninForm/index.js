import './styles.scss';
// import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// page of user form subsciption

export default function SignInForm() {
  const navigate = useNavigate();
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [gender, setGender] = useState('');
  const [img, setImg] = useState(null);
  const [bio, setBio] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState(null);

  console.log(password);

  const validatePassword = () => {
    setPasswordValid(password.length >= 7);
  };

  // function to handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    validatePassword();
    if (!isPasswordValid) {
      alert(`Le mot de passe doit contenir au moins 8 caractères`);
      return;
    }
    //create new formdata
    const formdata = new FormData()
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('pseudo', pseudo)
    formdata.append('date_of_birth', date_of_birth)
    formdata.append('name', name)
    formdata.append('img', img)
    formdata.append('firstname', firstname)
    formdata.append('bio', bio)
    formdata.append('gender', gender)


    //send the request data 
    await axios.post((`${process.env.REACT_APP_BASE_API_URL}register`), formdata)
    .then((response) => {
      console.log(response);
      //validation message
      setShowModal(true);
      setTimeout(() => {

        // link to the user concert list
          navigate('/login', { state: { message: 'Ton profil a bien été créé &#128522;' } });
        }, 2000);
      })
      .catch((error) => {
        //error message for the user
        setError('Le mot de passe doit contenir au moin 8 caratères et tous les champs doivent être remplis');        
        console.error(error);
        // Traitement de la réponse si la connexion échoue
      });
  };
  return (
    <section className="formPage">
      <Modal
        className="custom-modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="confirmation Modal"
      >
        <h2>Ton profil a bien été créé &#128522;</h2>
      </Modal>
      <form className="formRegister" onSubmit={handleSubmit}>
        <div className="form_left">
          <div className="form_profil">
            <h2>Création de ton profil</h2>
            <label className="label">
              Ton Nom:
              <input className="input" type="text" name="name" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="label">
              Ton Prénom:
              <input className="input" type="text" name="firstname" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </label>
            <label className="label">Ton Pseudo:
              <input className="input" type="text" name="pseudo" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
            </label>
            <label className="label">
              Ton genre:
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>...</option>
                <option value="Femme">Femme</option>
                <option value="Homme">Homme</option>
                <option value="Non-binaire">Non-binaire</option>
                <option value="Autre">Autre</option>
              </select>
            </label>
            <label className="label">
              Ta date de naissance:
              <input className="input birth" type="date" name="birthday" placeholder="" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </label>
            <div className="identify">
              <h2>Identifiants</h2>
              <label className="label">
                Ton Email:
                <input className="input" type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="label">Ton mot de passe:
                <input className="input" type="text" name="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <div className="error">{error}</div>}
              </label>
            </div>
          </div>
        </div>
        <div className="form_right">
          <div className="picture">
            <h2>Ta photo</h2>
            {!!img && <img src={URL.createObjectURL(img)} className="imgProfil" />}
            <label>
              {img ? "Modifier l'image" : 'Ajouter une image'}
              <input type="file" id="img" hidden onChange={(e) => setImg(e.target.files[0])} />
            </label>
          </div>
          <div className="bio">
            <h2>Ta bio</h2>
            <textarea className="input bio" type="texte" name="bio" placeholder="Décris toi en quelques lignes" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>
        <input className="buttonForm" type="submit" value="Envoyer" />
      </form>
    </section>
  );
}

// SignInForm.propTypes = {
// email: PropTypes.string.isRequired,
//  password: PropTypes.string.isRequired,
// pseudo: PropTypes.string.isRequired,
// name: PropTypes.string.isRequired,
//  firstname: PropTypes.string.isRequired,
// date_of_birth: PropTypes.instanceOf(Date),
//  bio: PropTypes.string.isRequired,
//  gender: PropTypes.string.isRequired,
//  img: PropTypes.string.isRequired,
//  handleSubmit: PropTypes.func.isRequired,
// }
