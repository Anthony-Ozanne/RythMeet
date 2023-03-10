import './styles.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';



//page with the concerts where the user go or had created
export default function UserList() {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_URL}me/concertslist`,{withCredentials: true})
          .then((response) => {
        setConcerts(response.data);
        console.log(response.data.concert_user);
      })
      .catch((error) => {
        alert('Il y a une erreur');
        console.error(error);
      });
  }, []);

  return (
    <section className='container_mylist'>
      <div className='top'>
        <h2>Mes Concerts</h2>
      </div>
      <div className="list">
        {concerts.map((data) => (
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
    </section>
  )
}
