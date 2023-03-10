// == Import

import './styles.scss';
import { BiMapPin } from 'react-icons/bi';
import { GiArrowDunk } from 'react-icons/gi';
import { BsCalendar3, BsArrowRightShort } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../authContext';

export default function Concert() {
  const { id } = useParams();
  const [concert, setConcert] = useState(null);
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  function getAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }

  const isUserSubscribe = () => (!!concert.subscribers.some((el) => el.pseudo === currentUser.pseudo));

  // Je récupère les informations du concert sur lequel j'ai cliqué
  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const concertData = await axios.get(`${process.env.REACT_APP_BASE_API_URL}concert/${id}`,
        {
          withCredentials: true
        },
      )
        .then((response) => response.data.concert[0]);
      setConcert(concertData);
      setIsLoading(false);
    };
    getData();
  }, [id]);

  const handleSubscription = async () => {
    try {
      if (!isUserSubscribe()) { // ajouter un abonné si l'utilisateur n'est pas déjà abonné
        const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}concert/${id}/subscribe`, {
          user_id: currentUser.id,
        }, { withCredentials: true });
        // Ajouter le nouveau subscriber à la liste des subscribers
        setConcert(response.data.concert);
      }
      else { // supprimer l'abonné si l'utilisateur est déjà abonné
        await axios.post(`${process.env.REACT_APP_BASE_API_URL}concert/${id}/unsubscribe`, {
          user_id: currentUser.id,
        }, { withCredentials: true })

        // Retirer l'utilisateur de la liste des subscribers
        setConcert({
          ...concert,
          subscribers: concert.subscribers.filter(
            (subscriber) => subscriber.id !== currentUser.id,
          ),
        });
      }
    }
    catch (error) {
      console.error(error)
      alert('Il y a une erreur handleSubscription');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // J'ajoute ou retire un utilisateur de ma liste des subscribers
  return (
    <section className="concert">

      <div className="imageConcert">
        <div className="avatarConcert">
          <span>{concert?.artist_name}</span>
        </div>
        <div className="iconsConcert">
          <div className="placeConcert">
            <BiMapPin className="placeIcon" />
            <p>{concert?.place}</p>
          </div>
          <div className="dateConcert">
            <BsCalendar3 className="dateIcon" />
            <p>{moment(concert?.date).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      </div>
      <div className="infoConcert">
        <h3 className="titleConcert">
          Trouve quelqu'un pour t'accompagner
        </h3>
        {!!currentUser || <button type="button" className="glow-on-hover">
        < a href="/login"><span>Merci de vous connecter</span></a>
      </button>}
 
      <GiArrowDunk className="arrowDunk" />

      {!!currentUser && <button type="button" className="subButton" onClick={handleSubscription}>
        {concert.subscribers?.some((el) => el.pseudo === currentUser.pseudo) ? 'Me désinscrire' : "M'inscrire"}

      </button>}
    </div>
      { !!currentUser && <h3 className="titlelist">Personnes inscrites:</h3> }
  <div className="subscribers">
    {!!currentUser && concert?.subscribers?.map((subscriber) => (
      <div className="subscriber" key={subscriber.id}>
        <div className="subscriberImg">
          <img src={`http://localhost:8000/uploads/images/users/${subscriber.img}`} alt="photo de profil de l'utilisateur" />
          <div className="overlayInfo">
            <BsArrowRightShort className="viewProfile" onClick={() => navigate(`/profil/${subscriber.id}`)} />
          </div>
        </div>
        <div className="subscriberFooter">
          <div className="subscriberPseudo">{subscriber.pseudo}</div>
          <div className="subscriberAge">{getAge(subscriber.date_of_birth)} ans</div>
        </div>
      </div>
    ))}

  </div>
    </section >
  );
}
