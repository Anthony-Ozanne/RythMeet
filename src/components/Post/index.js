// == Import
import './styles.scss';
import { CgMoreVertical } from 'react-icons/cg';
import { BiLike, BiHeart } from 'react-icons/bi';
import user from '../../assets/img/1.jpeg';
import concert from '../../assets/img/concert.png';

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={user} alt="" />
            <span className="postPseudo">Pseudo</span>
            <span className="postDate">il y a 5 minutes</span>
          </div>
          <div className="postTopRight">
            <CgMoreVertical className="moreIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Bonjour ! C'est mon premier commentaire !</span>
          <img className="postImg" src={concert} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <BiLike className="likeIcon" />
            <BiHeart className="likeIcon" />
            <span className="postLikeCounter">17 personnes aiment ça</span>
          </div>
          {/* // Réponse à un commentaire
          {/* <div className="postBottomRight">
            <span className="postCommentText"></span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
