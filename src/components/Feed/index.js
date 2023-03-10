// == Import
import './styles.scss';
import Share from '../Share';
import Post from '../Post';

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
      </div>
    </div>
  );
}
