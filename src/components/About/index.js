import './styles.scss';

// about page

export default function About() {
  return (
    <section className="about_container">
      <div className="streamer">
        <h2>Qui sommes nous ? </h2>
      </div>
      <section className="texts">
        <p className="intro">“Un concert c’est une histoire de chimie entre deux entités : le public d’un côté et la scène de l’autre.” Jean-Michel Jarre</p>
        <div className="paragraphs">
          <p className="paragraph_one"><span>RythMeet</span> c'est un projet de fin de formation, mais c'est avant tout une idée, une équipe et un amour pour la musique.</p>
          <p className="paragraph_two"><span>RythMeet</span> c'est une équipe de 4 étudiant.es dev' web en reconversion professionnelle: JB et Grégory sur la partie Backend, Anthony et Caro sur la partie Frontend.
            <p className="inter">Souvent, lors de concerts, il y a un bon nombre de personnes postant des messages, sur les réseaux sociaux en lien avec l'artiste,  pour trouver quelqu'un pour les accompagner par crainte d'y aller seule. C'est de là qu'est née l'idée de <span>RythMeet</span>, créer une plateforme pour mettre en relation ces personnes et faciliter les échanges. </p>
            <p className="inter"><span>RythMeet</span> n'en est qu'à sa version initial faite par des juniors dans une limite de temps imposée, mais nous avons plein d'idées d'amélioration pour le future</p>
          </p>
        </div>
      </section>
    </section>
  );
}
