import './styles.scss';
import { useState } from 'react';
import { TfiArrowCircleRight, TfiArrowCircleLeft } from 'react-icons/tfi';
import img1 from '../../assets/img/1.png';
import img2 from '../../assets/img/2.png';
import img3 from '../../assets/img/3.png';
import img4 from '../../assets/img/4.png';
import img5 from '../../assets/img/5.png';

export default function Home() {
  const [currentSlide, setcurrentSlide] = useState(0);

  const data = [
    {
      id: 1,
      title: 'T\'en as marre d\'aller seul.e en concert?',
      img: img1,
    },
    {
      id: 2,
      title: 'Connecte toi pour avoir accès à toutes les fonctionnalités',
      img: img2,
    },
    {
      id: 3,
      title: 'Cherche le concert où tu veux aller, clique sur l\'événement ou ajoute le si tu ne le trouve pas',
      img: img3,
    },
    {
      id: 4,
      title: 'Ajoute toi à la liste des participant.es et prend contacte avec cell.eux déjà inscrit.es via l\'adresse mail sur leur profil',
      img: img4,
    },
    {
      id: 5,
      title: 'Maintenant, rythmez-vous bien !',
      img: img5,
    },
  ];

  const handleClick = (route) => {
    route === 'left' ? setcurrentSlide(currentSlide > 0 ? currentSlide - 1 : 4) : setcurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };

  return (
    <section className="home" id="home">
      <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {data.map((d) => (
          <div className="containerHome" key={d.id}>
            <div className="item">
              <div className="left">
                <div className="leftContainer">
                  <p>{d.title}</p>
                </div>
              </div>
              <div className="right">
                <img className="imgSlide" src={d.img} alt="" />
                {console.log(d.img)}
              </div>
            </div>

          </div>
        ))}
      </div>
      <TfiArrowCircleLeft className="arrow left" onClick={() => handleClick('left')} />
      <TfiArrowCircleRight className="arrow right" onClick={() => handleClick('right')} />
    </section>
  );
}
