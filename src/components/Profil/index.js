import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './styles.scss';

// page profils

export default function Profil() {
  // state
  const [user, setUser] = useState({});
  const { id } = useParams();

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

  // api call
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_URL}user/${id}`, {
      // sending token
      withCredentials: true,
    })
      .then((response) => {
        // response to fin the data of the user with the user id
        setUser(response.data);
        console.log(response.data);
        console.log('profil affiché');
      })
      .catch((error) => {
        // error
        alert('Il y a une erreur');
        console.error(error);
      });
  }, []);

  return (
    <section className="profil">
      <div className="profil_container">
        <div className="profil_photo">
          <img src={`http://localhost:8000/uploads/images/users/${user.img}`} alt="" />
        </div>
        <div className="info_user">
          <p className="pseudo">{user.pseudo}</p>
          <p>{getAge(user.date_of_birth)} ans</p>
          <p>{user.gender}</p>
        </div>
        <p className="toptext">Pour en savoir un peu plus sur moi :</p>
        <p className="description">{user.bio}</p>
        <p className="toptext">Tu peux me contacter ici :</p>
        <p className="contact_user">{user.email}</p>
      </div>
    </section>
  );
}
