import {useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext';

import './styles.scss';

// page profils

export default function MyProfil() {
  const navigate = useNavigate();
  // token stockage
  const { currentUser } = useContext(AuthContext);

  // function to translate the date of birth into an age
  function getAge(date_of_birth) {
    const today = new Date();
    const birthDate = new Date(date_of_birth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }

  // function to link to the edit page on click on the button edit
  function handleClick() {
    return (
      navigate('/profil/me/edit')
    );
  }

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <section className="profil">
      <div className="profil_container">
        <div className="profil_photo">
          {currentUser?.img ? <img src={`http://localhost:8000/uploads/images/users/${currentUser.img}`} alt="" /> : <img src={`https://cdn-icons-png.flaticon.com/512/2350/2350412.png`} alt="" /> }
        </div>
        <div className="info_user">
          <p className="pseudo">{currentUser.pseudo}</p>
          <p>{getAge(currentUser.date_of_birth)} ans</p>
          <p>{currentUser.gender}</p>
        </div>
        <p className="toptext">Pour en savoir un peu plus sur moi :</p>
        <p className="description">{currentUser.bio}</p>
        <p className="toptext">Tu peux me contacter ici :</p>
        <p className="contact_user">{currentUser.email}</p>
        <button type="button" className="edit" onClick={handleClick}>Modifier</button>
      </div>
    </section>
  );
}
