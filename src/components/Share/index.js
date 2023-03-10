// == Import
import './styles.scss';
import { MdPermMedia, MdEmojiEmotions } from 'react-icons/md';
import user from '../../assets/img/1.jpeg';

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user} alt="" />
          <input placeholder="Discutez ..." className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <MdPermMedia className="shareIcon" />
              <span className="shareOptionText">Photo ou vidéo</span>
            </div>
            <div className="shareOption">
              <MdEmojiEmotions className="shareIcon" />
              <span className="shareOptionText">Emotes</span>
            </div>
          </div>
          <button type="submit" className="shareButton">Envoyer</button>
        </div>
      </div>
    </div>
  );
}
