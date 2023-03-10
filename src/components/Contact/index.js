import './styles.scss';

//page contact

export default function Contact() {
  return(
    <section className='contact_container'>
      <div className='right_side'>
      <h2 className='contact_title'>Nous contacter</h2>
      <p className='contact_text'>Si vous voulez faire par de vos idées ou remarques, hésitez pas à nous envoyer un mail.</p>
      
      <p className='contact_text'>Vous pouvez également nous suivre sur les résaux sociaux pour en savoir plus sur les projets et évolutions à venir.</p>
      </div>
      <ul className='contact_list'>
        <li className='mail'>
          <a href="mailto:rythmeet@gmail.com">rythmeet@gmail.com</a>
        </li>
        <li className='insta'> 
          <a href="https://www.instagram.com/RythMeet_app/">Instagram</a>
        </li>
        <li className='facebook'>   
          <a href="https://www.facebook.com/profile.php?id=100090595224979">Facebook</a>
        </li>
        <li className='twitter'>
          <a href="https://twitter.com/RythMeet_app">Twitter</a>
        </li>  
      </ul>  
    </section>
  )
}
