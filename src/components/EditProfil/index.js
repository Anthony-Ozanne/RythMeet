import './styles.scss';

import { useEffect, useState,useContext } from 'react';
import { AuthContext } from '../../authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



// page of user form subsciption

export default function EditProfil() {
  const navigate = useNavigate()
  const { currentUser, updateUser } = useContext(AuthContext);

  //state
  const [pseudo, setPseudo] = useState(currentUser?.pseudo || '');
  const [gender, setGender] = useState(currentUser?.gender || '');
  const [img, setImg] = useState(null);
  const [bio, setBio] = useState(currentUser?.bio || '');

      //create new formdata for request api
      const formdata = new FormData()
      formdata.append('pseudo', pseudo)
      if(img) formdata.append('img', img)
      formdata.append('bio', bio)
      formdata.append('gender', gender)
      
  // function to handle the submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("edit profil")
    //send the request data
    await axios.post(`${process.env.REACT_APP_BASE_API_URL}me`, formdata, {
    withCredentials: true})
      .then((response) => {
        console.log("ADD IMAGE", response.data)
        updateUser(response.data)
        // link to the login page
      navigate('/profil/me');
      })
      .catch((error) => {
        alert('Il y a une erreur');
               // Traitement de la réponse si la connexion échoue
      });

  };
  return (
    <section className="formPage">
      <form className="formRegister" onSubmit={handleSubmit}>
        <div className="form_left">
          <div className="form_profil">
            <h2>Modifier ton profil</h2>
            <label className="label">Ton Pseudo:
              <input className="input" type="text" name="pseudo" placeholder="" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
            </label>
            <label className="label">
              Ton genre:
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option >...</option>
                <option value={'Femme'}>Femme</option>
                <option value={'Homme'}>Homme</option>
                <option value={'Non-binaire'}>Non-binaire</option>
                <option value={'Autre'}>Autre</option>
              </select>
            </label>        
          </div>
        </div>
        <div className="form_right">
          <div className="picture">
            <h2>Ta photo</h2>
            {!!img && <img src={img} className="imgProfil" />}
            <label >
              {img ? "Modifier l'image" : 'Ajouter une image'}
              <input type="file" id="img" hidden={true} onChange={(e) => setImg(e.target.files[0])} />
            </label>
          </div>
          <div className="bio">
            <h2>Ta bio</h2>
            <textarea className="input bio" type="texte" name="bio" placeholder="" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>
        <input className="buttonForm" type="submit" value="Envoyer" />
      </form>
    </section>
  );
}

